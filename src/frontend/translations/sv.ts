// src/translations/sv.ts
export const sv = {
  common: {
    appName: 'DidiS',
    tagline: 'Digital demokrati för Sverige',
    getStarted: 'Kom igång',
    learnMore: 'Läs mer',
    signIn: 'Logga in',
    about: 'Om oss',
    proposals: 'Förslag',
    actions: {
      primary: 'Bekräfta',
      secondary: 'Avbryt',
      outline: 'Alternativ',
      ghost: 'Diskret',
    },
    states: {
      disabled: 'Inaktiverad',
      loading: 'Laddar...',
    },
    placeholders: {
      default: 'Skriv här...',
      error: 'Felaktigt värde',
      disabled: 'Inaktiverad',
    },
    errors: {
      required: 'Detta fält är obligatoriskt',
    },
  },
  nav: {
    home: 'Hem',
    about: 'Om oss',
    proposals: 'Förslag',
    myAccount: 'Mitt konto',
    designSystem: 'Design System',
  },
  home: {
    title: 'Digital demokrati för Sverige',
    subtitle: 'Stärk medborgarinflytandet genom säkert, transparent och tillgängligt digitalt deltagande',
    cta: {
      primary: 'Kom igång',
      secondary: 'Läs mer',
    },
  },
  auth: {
    signIn: 'Logga in',
    signOut: 'Logga ut',
    bankID: 'Logga in med BankID',
  },
  footer: {
    rights: '© {year} DidiS. Alla rättigheter förbehållna',
  },
  designSystem: {
    title: 'Design System',
    description: 'En översikt över DidiS komponenter och designsystem.',
    buttons: {
      title: 'Knappar',
      description: 'Olika typer av knappar och deras användningsområden.',
      variants: 'Varianter',
      states: 'Tillstånd',
    },
    forms: {
      title: 'Formulär',
      description: 'Komponenter för datainmatning och formulär.',
      inputs: 'Textfält',
    },
    cards: {
      title: 'Kort',
      description: 'Containrar för att gruppera relaterat innehåll.',
      example: {
        title: 'Exempel på kort',
        description: 'En beskrivning av kortets innehåll',
        content: 'Detta är ett exempel på innehåll i ett kort.',
      },
    },
  },
  dashboard: {
    title: 'Översikt',
    welcome: 'Välkommen',
    notifications: 'Aviseringar',
    settings: 'Inställningar',
    profile: 'Profil',
    table: {
      title: 'Senaste förslag',
      columns: {
        id: 'ID',
        name: 'Namn',
        status: 'Status',
        date: 'Datum'
      }
    },
    chart: {
      title: 'Aktivitetsöversikt',
      proposals: 'Förslag',
      votes: 'Röster'
    }
  },
  profile: {
    title: 'Min profil',
    personalInfo: {
      title: 'Personuppgifter',
      name: 'Namn',
      email: 'E-postadress',
      phone: 'Telefonnummer',
      municipality: 'Kommun',
      notifications: 'Aviseringar'
    },
    activity: {
      title: 'Aktivitet',
      noActivity: 'Ingen aktivitet än',
      types: {
        proposal: 'Förslag',
        vote: 'Röstning',
        comment: 'Kommentar'
      },
      status: {
        active: 'Aktiv',
        completed: 'Avslutad',
        pending: 'Väntande'
      }
    },
    interests: {
      title: 'Intresseområden',
      addInterest: 'Lägg till område',
      environment: 'Miljö',
      traffic: 'Trafik',
      culture: 'Kultur',
      education: 'Utbildning',
      health: 'Hälsa',
      housing: 'Boende'
    },
    settings: {
      title: 'Inställningar',
      emailNotifications: 'E-postaviseringar',
      smsNotifications: 'SMS-aviseringar',
      language: 'Språk'
    },
    buttons: {
      save: 'Spara ändringar',
      edit: 'Redigera',
      cancel: 'Avbryt'
    }
  },
  settings: {
    title: 'Inställningar',
    sections: {
      notifications: {
        title: 'Aviseringar',
        emailNotifications: 'E-postaviseringar',
        smsNotifications: 'SMS-aviseringar',
        proposalUpdates: 'Uppdateringar om förslag',
        voteReminders: 'Påminnelser om röstningar',
        newsletterUpdates: 'Nyhetsbrev'
      },
      privacy: {
        title: 'Sekretess och säkerhet',
        profileVisibility: 'Profilsynlighet',
        activityVisibility: 'Aktivitetssynlighet',
        dataUsage: 'Dataanvändning'
      },
      language: {
        title: 'Språk och region',
        interfaceLanguage: 'Gränssnittsspråk',
        contentLanguage: 'Innehållsspråk',
        municipality: 'Kommun'
      }
    },
    buttons: {
      save: 'Spara ändringar',
      cancel: 'Avbryt',
      reset: 'Återställ'
    },
    messages: {
      saveSuccess: 'Inställningarna har sparats',
      saveError: 'Ett fel uppstod när inställningarna skulle sparas'
    }
  },
  editor: {
    placeholder: 'Börja skriva...',
    toolbar: {
      bold: 'Fet',
      italic: 'Kursiv',
      bulletList: 'Punktlista',
      orderedList: 'Numrerad lista',
      alignLeft: 'Vänsterjustera',
      alignCenter: 'Centrera',
      alignRight: 'Högerjustera',
      link: 'Lägg till länk'
    }
  }
}

