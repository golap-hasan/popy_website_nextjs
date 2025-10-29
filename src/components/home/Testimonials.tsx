import PageLayout from "@/tools/PageLayout";

const testimonials = [
  {
    quote:
      "Popy Library makes it effortless to keep our school library refreshed. Their academic selections are always up-to-date.",
    name: "Shamima Rahman",
    role: "Head Teacher, Dhaka Residential School",
  },
  {
    quote:
      "From competitive exam guides to children’s books, I can order everything in one basket and get it delivered fast.",
    name: "Nabil Karim",
    role: "University Student",
  },
  {
    quote:
      "The editorial picks help me explore authors beyond the syllabus. It’s like having a personal curator.",
    name: "Farhana Akter",
    role: "Freelance Writer",
  },
];

const Testimonials = () => {
  return (
      <PageLayout>
        <div className="flex flex-col gap-3 text-center">
          <span className="mx-auto rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Voices from our readers
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Community stories that inspire
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Hear how readers across Bangladesh rely on Popy Library for their academic and personal growth.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative flex h-full flex-col gap-6 rounded-3xl border border-border/50 bg-background/80 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="text-5xl leading-none text-primary/40">“</span>
              <p className="text-sm text-muted-foreground">{testimonial.quote}</p>
              <div className="space-y-1">
                <p className="text-base font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PageLayout>
  );
};

export default Testimonials;
