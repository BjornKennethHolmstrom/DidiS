// src/frontend/app/forslag/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { useTranslations } from '@/hooks/useTranslations'
import { 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Flag,
  Clock,
  Users,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowRight
} from 'lucide-react'

type ProposalStatus = 
  | 'draft'
  | 'collecting_support'
  | 'reviewing'
  | 'in_committee'
  | 'in_council'
  | 'approved'
  | 'rejected'
  | 'implemented'

// This would come from your API
const mockProposal = {
  id: '1',
  title: 'Förbättra cykelvägar i centrum',
  summary: 'Ett förslag för att göra centrum mer cykelvänligt',
  content: '<p>Detaljerad beskrivning av förslaget...</p>',
  author: 'Anna Andersson',
  createdAt: '2024-12-07',
  status: 'collecting_support' as ProposalStatus,
  supporters: 123,
  requiredSupporters: 250,
  comments: 45,
  category: 'Infrastruktur',
  municipality: 'Stockholm',
  timeline: [
    { date: '2024-12-07', event: 'Förslaget skapades' },
    { date: '2024-12-08', event: 'Började samla stöd' }
  ]
}

const mockRelatedProposals = [
  {
    id: '2',
    title: 'Utökad cykeluthyrning i staden',
    status: 'collecting_support' as ProposalStatus,
    supporters: 89,
    municipality: 'Stockholm'
  },
  {
    id: '3',
    title: 'Fler cykelparkeringar vid kollektivtrafik',
    status: 'in_committee' as ProposalStatus,
    supporters: 156,
    municipality: 'Stockholm'
  }
]

function getStatusInfo(status: ProposalStatus) {
  const statusMap = {
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

  return statusMap[status]
}

export default function ProposalPage() {
  const t = useTranslations()
  const params = useParams()
  const proposalId = params.id as string
  const proposal = mockProposal
  const statusInfo = getStatusInfo(proposal.status)

  const breadcrumbItems = [
    { label: t.proposals.title, href: '/forslag' },
    { label: proposal.title }
  ]

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Proposal Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${statusInfo.color}`}>
                  <statusInfo.icon className="h-4 w-4" />
                  {statusInfo.label}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-4">{proposal.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{proposal.author}</span>
                <span>•</span>
                <span>{proposal.createdAt}</span>
                <span>•</span>
                <span>{proposal.municipality}</span>
              </div>
            </div>

            {/* Main Content Card */}
            <Card>
              <CardContent className="pt-6">
                <p className="text-lg text-muted-foreground mb-6">
                  {proposal.summary}
                </p>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: proposal.content }}
                />
              </CardContent>
            </Card>

            {/* Action Bar */}
            <Card>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <Button 
                      variant="outline" 
                      className="gap-2"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{proposal.supporters}</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="gap-2"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>{proposal.comments}</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      title={t.common?.actions?.share || 'Dela'}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      title={t.common?.actions?.report || 'Rapportera'}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposal.status === 'collecting_support' && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Stöd som krävs</span>
                        <span className="font-medium">
                          {proposal.supporters} / {proposal.requiredSupporters}
                        </span>
                      </div>
                      <div className="w-full bg-neutral-100 rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2"
                          style={{ 
                            width: `${(proposal.supporters / proposal.requiredSupporters) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-medium mb-4">Tidslinje</h4>
                    <div className="space-y-3">
                      {proposal.timeline.map((event, index) => (
                        <div key={index} className="flex gap-3 text-sm">
                          <div className="w-20 text-muted-foreground">
                            {event.date}
                          </div>
                          <div>{event.event}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Proposals */}
            <Card>
              <CardHeader>
                <CardTitle>Liknande förslag</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRelatedProposals.map((related) => (
                    <Link 
                      key={related.id} 
                      href={`/forslag/${related.id}`}
                      className="block group"
                    >
                      <div className="rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                        <h3 className="font-medium mb-2 group-hover:text-primary">
                          {related.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{related.municipality}</span>
                          <span>{related.supporters} stödjare</span>
                        </div>
                      </div>
                    </Link>
                  ))}

                  <Button 
                    variant="outline" 
                    className="w-full"
                    href="/forslag?category=Infrastruktur"
                  >
                    Se fler liknande förslag
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
