// app/(public)/layout.tsx
import Navbar from '@/components/layout/Navbar';


export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      
    </>
  );
}
