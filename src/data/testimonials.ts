// Testimonials shown in SEQ // EVAL. To add one: fill a TODO slot or copy an object.
// `avatar` picks the placeholder bust ("male" | "female"); set `photo` (e.g. "/testimonials/name.webp") to use a real image instead.
// Entries with an empty `quote` only render in `npm run dev`, never in production.

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: "male" | "female";
  photo?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "", // TODO: paste real feedback
    author: "TODO_NAME",
    role: "ROLE, COMPANY",
    avatar: "male",
  },
  {
    quote: "", // TODO: paste real feedback
    author: "TODO_NAME",
    role: "ROLE, COMPANY",
    avatar: "female",
  },
  {
    quote: "", // TODO: paste real feedback
    author: "TODO_NAME",
    role: "ROLE, COMPANY",
    avatar: "male",
  },
];
