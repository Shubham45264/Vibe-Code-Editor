import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Youtube, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.svg"
                alt="VibeCode Logo"
                height={32}
                width={32}
                className="w-8 h-8"
              />
              <span className="font-bold text-xl tracking-tight dark:text-white">
                VibeCode
              </span>
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xs">
              A premium web-based code editor designed for the next generation of developers. 
              Built with performance and aesthetics in mind.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink href="https://github.com" icon={<Github className="w-5 h-5" />} />
              <SocialLink href="https://twitter.com" icon={<Twitter className="w-5 h-5" />} />
              <SocialLink href="https://linkedin.com" icon={<Linkedin className="w-5 h-5" />} />
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-8">
            <FooterLinkGroup title="Product">
              <FooterLink href="/docs">Documentation</FooterLink>
              <FooterLink href="/templates">Templates</FooterLink>
              <FooterLink href="/api">API Reference</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
            </FooterLinkGroup>

            <FooterLinkGroup title="Company">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </FooterLinkGroup>

            <FooterLinkGroup title="Legal">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/cookies">Cookie Policy</FooterLink>
            </FooterLinkGroup>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 dark:text-zinc-500 text-sm">
            © {currentYear} VibeCode Editor. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-zinc-400 dark:text-zinc-600 text-xs">
              Handcrafted with ❤️ by the VibeCode team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-white">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {children}
      </ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="p-2 rounded-full bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-all transform hover:-translate-y-1"
    >
      {icon}
    </Link>
  );
}
