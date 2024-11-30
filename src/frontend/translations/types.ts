// src/translations/types.ts
export interface Translations {
  common: {
    appName: string
    tagline: string
    getStarted: string
    learnMore: string
    signIn: string
    about: string
    proposals: string
    actions: {
      primary: string
      secondary: string
      outline: string
      ghost: string
    }
    signOut: string
  }
  nav: {
    home: string
    about: string
    proposals: string
    myAccount: string
    getStarted: string
  }
  getStarted: {
    title: string
    subtitle: string
    steps: {
      identify: {
        title: string
        description: string
      }
      propose: {
        title: string
        description: string
      }
      discuss: {
        title: string
        description: string
      }
      vote: {
        title: string
        description: string
      }
    }
    howItWorks: {
      title: string
      description: string
      features: string[]
    }
    cta: {
      primary: string
      secondary: string
    }
  }
  about: {
    title: string
    subtitle: string
    vision: {
      title: string
      content: string
    }
    features: {
      title: string
      items: {
        auth: {
          title: string
          description: string
        }
        accessibility: {
          title: string
          description: string
        }
        proposals: {
          title: string
          description: string
        }
        municipal: {
          title: string
          description: string
        }
        openSource: {
          title: string
          description: string
        }
        engagement: {
          title: string
          description: string
        }
      }
    }
    principles: {
      title: string
      openness: {
        title: string
        content: string
      }
      security: {
        title: string
        content: string
      }
      accessibility: {
        title: string
        content: string
      }
    }
    future: {
      title: string
      content: string
    }
  }
  // ... other sections
}
