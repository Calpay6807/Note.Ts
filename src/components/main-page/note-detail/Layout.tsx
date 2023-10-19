import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "../../../form/types";

type LayoutProps = {
  notes: Note[];
};

const Layout = ({ notes }: LayoutProps) => {
  const { id } = useParams();
  //notu bul
  const note = notes.find((n) => n.id == id);
  console.log(note);
  // note bulunmazsa anasayfaya döndür
  if (!note) return <Navigate to={"/"} replace />;
  // note bulunursa çocuk bileşeni ekrana bas
  return <Outlet context={note} />;
};
// çocuk rootlarda kullanılabilecek note bilgilerine
// erişim sağlayan fonksiyon
export function useNote() {
  return useOutletContext<Note>();
}
export default Layout;
