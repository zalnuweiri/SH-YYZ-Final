
// Make sure these paths match your actual project.
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const blogPosts = [
    {
        img: "/redesign/fig-blog-1.jpg",
        alt: "Date night at Silent H",
        title: "Date Night Restaurants in Toronto that Let You Worry About the Connection and Not the Experience",
    },
    {
        img: "/redesign/fig-blog-2.jpg",
        alt: "Happy hour drinks and food",
        title: "Happy Hour in Downtown Toronto: Where to Go After Work",
    },
    {
        img: "/redesign/fig-blog-3.jpg",
        alt: "Silent H restaurant interior",
        title: "Why Silent H Is the Best Mexican Restaurant in Toronto",
    },
    {
        img: "/redesign/fig-blog-4.jpg",
        alt: "Private dining room at Silent H",
        title: "Private Dining in Toronto: Where to Host Your Next Event",
    },
];

function BlogCard({ img, alt, title }) {
    return (
        <div className="flex flex-col gap-8 cursor-pointer group">
            <div className="relative overflow-hidden rounded-[4px] aspect-square">
                <img
                    src={img}
                    alt={alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <p
                className="leading-[1.2] text-[#0b0b0b] text-[22px] tracking-[3.3px]"
                style={{
                    fontFamily: "'_Monoglyphic', sans-serif",
                    fontStyle: "normal",
                }}
            >
                {title}
            </p>
        </div>
    );
}

export default function BlogsPage() {
    return (
        <div className="pt-20 bg-[#ece1d4] min-h-screen w-full">
            <Navbar />

            <header className="w-full flex flex-col items-center gap-8 pt-[100px] pb-16 px-6 text-center">
                <h1
                    className="text-[#0b0b0b] text-[clamp(28px,3.5vw,40px)] tracking-[4px] uppercase leading-none"
                    style={{
                        fontFamily: "'_Monoglyphic', sans-serif",
                        fontWeight: 700,
                    }}
                >
                    A blog full of experiences
                </h1>

                <p
                    className="text-[#0b0b0b] text-[clamp(16px,1.8vw,22px)] tracking-[2.2px] leading-[1.2] max-w-2xl"
                    style={{
                        fontFamily: "'NeueBit', sans-serif",
                        fontWeight: 400,
                    }}
                >
                    A closer look at the flavours, culture, and experiences behind Silent H.
                </p>
            </header>

            <main className="max-w-[1140px] mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16">
                    {blogPosts.map((post) => (
                        <BlogCard key={post.title} {...post} />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}