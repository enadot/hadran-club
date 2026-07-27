import type { CSSProperties } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgePercent,
  Ban,
  Bell,
  Book,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  CircleAlert,
  CircleCheck,
  Clock,
  CreditCard,
  Ellipsis,
  ExternalLink,
  FileText,
  Gift,
  GraduationCap,
  Handshake,
  HelpCircle,
  History,
  Home,
  Inbox,
  Info,
  Link as LinkIcon,
  Loader,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Minus,
  Package,
  Pencil,
  Percent,
  Phone,
  Plus,
  Quote,
  QrCode,
  Receipt,
  RefreshCw,
  Search,
  Settings,
  Share2,
  ShieldAlert,
  Shirt,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Store,
  Tag,
  Ticket,
  TrendingUp,
  Truck,
  User,
  UserPlus,
  Users,
  Utensils,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";

/**
 * The prototype's `Icon` fetched Lucide SVGs from the unpkg CDN and tinted them
 * with a CSS mask. This keeps the exact same API (`name`, `size`, `color`) and the
 * same icon set, but resolves the glyph at build time through `lucide-react` — no
 * runtime network dependency, no flash of unstyled icon.
 *
 * Names are the kebab-case Lucide names used across the .dc.html prototypes.
 */
const ICONS: Record<string, LucideIcon> = {
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "badge-percent": BadgePercent,
  ban: Ban,
  bell: Bell,
  book: Book,
  building: Building2,
  "building-2": Building2,
  calendar: Calendar,
  check: Check,
  "check-circle": CheckCircle2,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  circle: Circle,
  "circle-alert": CircleAlert,
  "circle-check": CircleCheck,
  clock: Clock,
  "credit-card": CreditCard,
  ellipsis: Ellipsis,
  "external-link": ExternalLink,
  "file-text": FileText,
  gift: Gift,
  "graduation-cap": GraduationCap,
  handshake: Handshake,
  "help-circle": HelpCircle,
  history: History,
  home: Home,
  inbox: Inbox,
  info: Info,
  link: LinkIcon,
  loader: Loader,
  lock: Lock,
  "log-out": LogOut,
  mail: Mail,
  "map-pin": MapPin,
  menu: Menu,
  minus: Minus,
  package: Package,
  pencil: Pencil,
  percent: Percent,
  phone: Phone,
  plus: Plus,
  "qr-code": QrCode,
  quote: Quote,
  receipt: Receipt,
  "refresh-cw": RefreshCw,
  search: Search,
  settings: Settings,
  "share-2": Share2,
  "shield-alert": ShieldAlert,
  shirt: Shirt,
  "shield-check": ShieldCheck,
  "shopping-bag": ShoppingBag,
  "shopping-cart": ShoppingCart,
  sparkles: Sparkles,
  store: Store,
  tag: Tag,
  ticket: Ticket,
  "trending-up": TrendingUp,
  truck: Truck,
  user: User,
  "user-plus": UserPlus,
  users: Users,
  utensils: Utensils,
  wallet: Wallet,
  x: X,
};

export type IconName = keyof typeof ICONS | (string & {});

export type IconProps = {
  name?: IconName;
  /** 16px inline with 14px text, 20px default, 24px for nav and feature bullets. */
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
};

export function Icon({
  name = "circle",
  size = 20,
  color = "currentColor",
  className,
  style,
}: IconProps) {
  const Glyph = ICONS[name] ?? Circle;
  return (
    <Glyph
      aria-hidden="true"
      width={size}
      height={size}
      // Lucide's 2px stroke and rounded caps are fixed by the design system.
      strokeWidth={2}
      color={color}
      className={className}
      style={{ flexShrink: 0, ...style }}
    />
  );
}
