// src/frontend/app/forslag/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslations } from '@/hooks/useTranslations'
import { cn } from '@/lib/utils' 
import { categories } from '@/data/categories'
import { 
  ThumbsUp, 
  MessageSquare,
  Users,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Search
} from 'lucide-react'
import { Input } from '@/components/ui/input'

type ProposalStatus = 
  | 'draft'
  | 'collecting_support'
  | 'reviewing'
  | 'in_committee'
  | 'in_council'
  | 'approved'
  | 'rejected'
  | 'implemented'

interface Proposal {
  id: string
  title: string
  summary: string
  author: string
  createdAt: string
  status: ProposalStatus
  supporters: number
  comments: number
  municipality: string
  category: string
}

const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Förbättra cykelvägar i centrum',
    summary: 'Ett förslag för att göra centrum mer cykelvänligt genom att bygga ut och förbättra befintliga cykelvägar.',
    author: 'Anna Andersson',
    createdAt: '2024-12-07',
    status: 'collecting_support',
    supporters: 123,
    comments: 45,
    municipality: 'Stockholm',
    category: 'Infrastruktur'
  },
  {
    id: '2',
    title: 'Utökad cykeluthyrning i staden',
    summary: 'Inför ett omfattande system för cykeluthyrning med stationer över hela staden.',
    author: 'Erik Eriksson',
    createdAt: '2024-12-06',
    status: 'reviewing',
    supporters: 250,
    comments: 32,
    municipality: 'Stockholm',
    category: 'Transport'
  },
  {
    id: '3',
    title: 'Fler laddstationer för elbilar',
    summary: 'Installation av fler laddstationer för elbilar i kommunala parkeringar.',
    author: 'Maria Nilsson',
    createdAt: '2024-12-05',
    status: 'in_committee',
    supporters: 189,
    comments: 27,
    municipality: 'Stockholm',
    category: 'Miljö'
  },
  {
    id: '4',
    title: 'Ny lekplats i stadsparken',
    summary: 'Förslag om att anlägga en modern och tillgänglig lekplats i stadsparken.',
    author: 'Johan Svensson',
    createdAt: '2024-12-04',
    status: 'approved',
    supporters: 445,
    comments: 56,
    municipality: 'Stockholm',
    category: 'Fritid'
  }
]

const statusInfo = {
  draft: {
    label: 'Utkast',
    color: 'bg-neutral-100 text-neutral-700',
    icon: Clock
  },
  collecting_support: {
    label: 'Samlar stöd',
    color: 'bg-blue-100 text-blue-700',
    icon: Users
  },
  reviewing: {
    label: 'Under granskning',
    color: 'bg-yellow-100 text-yellow-700',
    icon: AlertCircle
  },
  in_committee: {
    label: 'I nämnd',
    color: 'bg-purple-100 text-purple-700',
    icon: Users
  },
  in_council: {
    label: 'I fullmäktige',
    color: 'bg-indigo-100 text-indigo-700',
    icon: Users
  },
  approved: {
    label: 'Godkänt',
    color: 'bg-green-100 text-green-700',
    icon: CheckCircle2
  },
  rejected: {
    label: 'Avslaget',
    color: 'bg-red-100 text-red-700',
    icon: XCircle
  },
  implemented: {
    label: 'Genomfört',
    color: 'bg-emerald-100 text-emerald-700',
    icon: CheckCircle2
  }
}

function ProposalCard({ proposal }: { proposal: Proposal }) {
  const status = statusInfo[proposal.status]
  const StatusIcon = status.icon
  const category = categories.find(c => c.id === proposal.category)

  return (
    <Link href={`/forslag/${proposal.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${status.color}`}>
              <StatusIcon className="h-4 w-4" />
              {status.label}
            </span>
            {category && (
              <span className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground">
                {category.name}
              </span>
            )}
          </div>
          
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {proposal.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
            {proposal.summary}
          </p>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                {proposal.supporters}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                {proposal.comments}
              </span>
            </div>
            <span>{proposal.municipality}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function ProposalsPage() {
  const t = useTranslations()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredProposals = mockProposals.filter(proposal => {
    const matchesSearch = 
      proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.summary.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = !selectedCategory || proposal.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t.proposals.list.title}</h1>
          <Button href="/forslag/ny">
            {t.proposals.create.title}
          </Button>
        </div>

        {/* Search and filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              placeholder="Sök bland förslag..."
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm transition-colors',
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Proposals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>

        {filteredProposals.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            {searchQuery 
              ? 'Inga förslag matchade din sökning' 
              : t.proposals.list.empty}
          </p>
        )}
      </div>
    </MainLayout>
  )
}
