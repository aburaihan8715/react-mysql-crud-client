const year = new Date().getFullYear().toString();
export default function Footer() {
  return (
    <footer className="py-4 bg-slate-700 sticky bottom-0 border">
      <p className="text-center">&copy; {year} All right reserved by XYZ company</p>
    </footer>
  );
}
