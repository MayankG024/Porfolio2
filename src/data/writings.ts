// Essays shown in SEQ // WRITINGS, linking to blog.maynk.me. To add one: copy an object (newest first reads best).

export interface Writing {
  title: string;
  date: string;
  readTime: string;
  summary: string;
  url: string;
}

export const writings: Writing[] = [
  {
    title: "Radical Accountability in an Autopilot World",
    date: "2025.12.26",
    readTime: "7 MIN",
    summary: "What it takes to not be just another random person in this world.",
    url: "https://blog.maynk.me/blogs/radical-accountability-in-autopilot-world",
  },
  {
    title: "Human Brain: Evolved Beyond Control?",
    date: "2025.09.13",
    readTime: "10 MIN",
    summary: "The most researched yet the least understood organ.",
    url: "https://blog.maynk.me/blogs/human-brain-evolved-beyond-control",
  },
  {
    title: "How to Learn",
    date: "2025.08.05",
    readTime: "10 MIN",
    summary: "We've been doing it since we were born, but we haven't really been taught how to actually learn.",
    url: "https://blog.maynk.me/blogs/how-to-learn",
  },
  {
    title: "Science and Religion: Finding a Middle Ground",
    date: "2025.07.15",
    readTime: "8 MIN",
    summary: "Exploring the intersection of science and spirituality in understanding the universe.",
    url: "https://blog.maynk.me/blogs/science-and-religion-finding-middle-ground",
  },
];

export const BLOG_INDEX = "https://blog.maynk.me/blogs";
