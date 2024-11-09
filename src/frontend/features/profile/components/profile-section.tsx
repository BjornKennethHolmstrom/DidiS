// components/features/profile/profile-section.tsx
interface ProfileSectionProps {
  title: string
  children: React.ReactNode
}

export function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  )
}
