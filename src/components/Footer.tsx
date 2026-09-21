import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>&copy; {new Date().getFullYear()} {profile.name}</span>
      <div className="footer-links">
        <a href={profile.github}>GitHub</a>
        <a href={profile.linkedin}>LinkedIn</a>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
