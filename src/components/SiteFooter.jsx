import KoreanIcon from './KoreanIcon';

const exploreLinks = [
  'About Chijeu Keikeu',
  'People Behind the Cafe',
  'Other Branches',
];

const supportNotes = [
  'Your Account',
  'Your Orders',
  'Shipping Rates & Policies',
  'Returns & Replacements',
  'Help',
];

const socialLinks = [
  { name: 'facebook', label: 'Facebook' },
  { name: 'instagram', label: 'Instagram' },
  { name: 'tiktok', label: 'TikTok' },
];

function SiteFooter() {
  return (
    <footer className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
      <div className="flex flex-col gap-10 py-12 md:flex-row md:justify-between">
        <div className="flex gap-16">
          <div>
            <h3 className="text-base font-extrabold text-zinc-950">Get to Know Us</h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-500">
              {exploreLinks.map((label) => <li key={label}>{label}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-base font-extrabold text-zinc-950">Need Help?</h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-500">
              {supportNotes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-zinc-400">Social Media</h3>
          <ul className="mt-4 flex gap-3">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <button type="button" aria-label={social.label} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#8f7bd8] text-white transition hover:-translate-y-1 hover:bg-[#735fbf] active:scale-90">
                  <KoreanIcon name={social.name} className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-200 py-6 text-xs text-zinc-400">
        <p>© 2026 Chijeu Keikeu. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default SiteFooter;
