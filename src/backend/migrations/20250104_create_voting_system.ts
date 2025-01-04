import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create custom types
  await knex.raw(`
    CREATE TYPE vote_type AS ENUM (
      'yes_no',
      'ranked_choice',
      'multiple_choice',
      'approval',
      'weighted'
    );

    CREATE TYPE vote_status AS ENUM (
      'draft',
      'scheduled',
      'active',
      'counting',
      'completed',
      'cancelled'
    );
  `);

  // Create vote_sessions table
  await knex.schema.createTable('vote_sessions', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('title', 255).notNullable();
    table.text('description');
    table.specificType('vote_type', 'vote_type').notNullable();
    table.specificType('status', 'vote_status').notNullable().defaultTo('draft');
    table.uuid('proposal_id').references('id').inTable('proposals');
    table.uuid('created_by').notNullable().references('id').inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('start_time').notNullable();
    table.timestamp('end_time').notNullable();
    table.integer('min_options').defaultTo(1);
    table.integer('max_options');
    table.integer('points_per_voter');
    table.integer('quorum_requirement');
    table.decimal('majority_requirement');
    table.integer('eligible_voter_count');
    
    // Add check constraints
    table.check('??::timestamp > ??::timestamp', ['end_time', 'start_time'], 'valid_time_range');
    table.check('?? >= ??', ['max_options', 'min_options'], 'valid_options_range');
  });

  // Create vote_options table
  await knex.schema.createTable('vote_options', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('vote_session_id').notNullable().references('id').inTable('vote_sessions');
    table.string('title', 255).notNullable();
    table.text('description');
    table.integer('option_order').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.unique(['vote_session_id', 'option_order']);
  });

  // Create cast_votes table
  await knex.schema.createTable('cast_votes', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('vote_session_id').notNullable().references('id').inTable('vote_sessions');
    table.uuid('voter_id').notNullable().references('id').inTable('users');
    table.timestamp('cast_at').defaultTo(knex.fn.now());
    table.text('verification_hash').notNullable();
    table.timestamp('invalidated_at');
    table.text('invalidation_reason');
    table.unique(['vote_session_id', 'voter_id']);
  });

  // Create vote_details table
  await knex.schema.createTable('vote_details', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('cast_vote_id').notNullable().references('id').inTable('cast_votes');
    table.uuid('option_id').notNullable().references('id').inTable('vote_options');
    table.integer('rank');
    table.integer('points');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.check('?? > 0', ['rank'], 'valid_rank');
    table.check('?? >= 0', ['points'], 'valid_points');
  });

  // Create vote_results table
  await knex.schema.createTable('vote_results', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('vote_session_id').notNullable().references('id').inTable('vote_sessions');
    table.uuid('option_id').notNullable().references('id').inTable('vote_options');
    table.integer('vote_count').notNullable().defaultTo(0);
    table.integer('rank_points').defaultTo(0);
    table.integer('weighted_points').defaultTo(0);
    table.decimal('percentage');
    table.timestamp('calculated_at').defaultTo(knex.fn.now());
    table.unique(['vote_session_id', 'option_id']);
  });

  // Create vote_audit_log table
  await knex.schema.createTable('vote_audit_log', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('vote_session_id').notNullable().references('id').inTable('vote_sessions');
    table.string('event_type', 50).notNullable();
    table.jsonb('event_data');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('actor_id').references('id').inTable('users');
  });

  // Create indexes
  await knex.schema.raw(`
    CREATE INDEX idx_vote_sessions_status ON vote_sessions(status);
    CREATE INDEX idx_vote_sessions_start_time ON vote_sessions(start_time);
    CREATE INDEX idx_vote_sessions_end_time ON vote_sessions(end_time);
    CREATE INDEX idx_cast_votes_session_voter ON cast_votes(vote_session_id, voter_id);
    CREATE INDEX idx_vote_details_cast_vote ON vote_details(cast_vote_id);
    CREATE INDEX idx_vote_results_session ON vote_results(vote_session_id);
    CREATE INDEX idx_vote_audit_session ON vote_audit_log(vote_session_id);
  `);

  // Create updated_at triggers
  await knex.schema.raw(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$ language 'plpgsql';

    CREATE TRIGGER update_vote_sessions_updated_at
        BEFORE UPDATE ON vote_sessions
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();

    CREATE TRIGGER update_vote_options_updated_at
        BEFORE UPDATE ON vote_options
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
  `);
}

export async function down(knex: Knex): Promise<void> {
  // Drop triggers first
  await knex.schema.raw(`
    DROP TRIGGER IF EXISTS update_vote_options_updated_at ON vote_options;
    DROP TRIGGER IF EXISTS update_vote_sessions_updated_at ON vote_sessions;
    DROP FUNCTION IF EXISTS update_updated_at_column();
  `);

  // Drop tables in reverse order
  await knex.schema.dropTableIfExists('vote_audit_log');
  await knex.schema.dropTableIfExists('vote_results');
  await knex.schema.dropTableIfExists('vote_details');
  await knex.schema.dropTableIfExists('cast_votes');
  await knex.schema.dropTableIfExists('vote_options');
  await knex.schema.dropTableIfExists('vote_sessions');

  // Drop custom types
  await knex.raw(`
    DROP TYPE IF EXISTS vote_status;
    DROP TYPE IF EXISTS vote_type;
  `);
}
