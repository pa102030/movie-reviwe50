/* ============================================
   MOVIES WORLD - JavaScript Application
   ============================================ */

// ============================================
// DATA
// ============================================

const movies = [
    {
        id: 1,
        title: "Oppenheimer",
        year: 2023,
        director: "Christopher Nolan",
        cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
        runtime: "180 min",
        genres: ["Biography", "Drama", "History"],
        rating: 8.9,
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop",
        description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb. A gripping historical epic that explores the moral complexities of scientific discovery.",
        fullReview: "Christopher Nolan delivers a masterful biographical drama that is as intellectually stimulating as it is emotionally devastating. Cillian Murphy's portrayal of J. Robert Oppenheimer is nothing short of extraordinary—capturing the physicist's brilliance, ambition, and inner turmoil with remarkable nuance. The film's non-linear structure, combined with Ludwig Göransson's haunting score and Hoyte van Hoytema's stunning cinematography, creates an immersive experience that lingers long after the credits roll. The Trinity test sequence is one of the most breathtaking moments in modern cinema.",
        ratings: { story: 9.2, acting: 9.5, direction: 9.3, cinematography: 9.4, entertainment: 8.5 },
        pros: ["Cillian Murphy's career-defining performance", "Stunning IMAX cinematography", "Complex, layered storytelling", "Exceptional sound design"],
        cons: ["Runtime may feel long for some", "Dense scientific dialogue"],
        trailer: "https://www.youtube.com/embed/uYPbbksJxIg",
        similar: [2, 5, 8]
    },
    {
        id: 2,
        title: "Dune: Part Two",
        year: 2024,
        director: "Denis Villeneuve",
        cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
        runtime: "166 min",
        genres: ["Sci-Fi", "Adventure", "Drama"],
        rating: 8.7,
        poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop",
        description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against those who destroyed his family. A visually spectacular sci-fi epic.",
        fullReview: "Denis Villeneuve cements his status as the master of modern science fiction with this breathtaking sequel. Dune: Part Two expands the scope and ambition of its predecessor, delivering a sand-swept epic that balances spectacular action with profound political and philosophical themes. Timothée Chalamet's transformation from reluctant hero to messianic figure is compelling, while Zendaya's expanded role brings emotional depth. The desert cinematography is awe-inspiring, and Hans Zimmer's score elevates every scene to operatic heights.",
        ratings: { story: 8.8, acting: 8.5, direction: 9.2, cinematography: 9.5, entertainment: 9.0 },
        pros: ["Breathtaking desert visuals", "Epic scale and scope", "Hans Zimmer's phenomenal score", "Strong character development"],
        cons: ["Pacing drags in middle act", "Some plot threads feel rushed"],
        trailer: "https://www.youtube.com/embed/Way9Dexny3w",
        similar: [1, 8, 12]
    },
    {
        id: 3,
        title: "The Batman",
        year: 2022,
        director: "Matt Reeves",
        cast: ["Robert Pattinson", "Zoë Kravitz", "Jeffrey Wright", "Colin Farrell"],
        runtime: "176 min",
        genres: ["Action", "Crime", "Drama"],
        rating: 7.8,
        poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop",
        description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
        fullReview: "Matt Reeves delivers a noir-infused take on the Dark Knight that feels refreshingly grounded and atmospheric. Robert Pattinson brings a brooding intensity to Bruce Wayne, portraying a younger, more volatile Batman still learning to be a symbol of hope. The film's detective-story structure sets it apart from previous iterations, while Greig Fraser's cinematography paints Gotham in shadows and rain. Paul Dano's Riddler is genuinely unsettling, and the film's exploration of vengeance versus justice adds thematic weight.",
        ratings: { story: 8.0, acting: 8.2, direction: 8.3, cinematography: 8.8, entertainment: 7.5 },
        pros: ["Atmospheric noir aesthetic", "Pattinson's intense performance", "Gripping detective plot", "Incredible cinematography"],
        cons: ["Overlong runtime", "Third act loses some focus"],
        trailer: "https://www.youtube.com/embed/mqqft2x_Aa4",
        similar: [6, 9, 15]
    },
    {
        id: 4,
        title: "Everything Everywhere All at Once",
        year: 2022,
        director: "Daniel Kwan, Daniel Scheinert",
        cast: ["Michelle Yeoh", "Stephanie Hsu", "Ke Huy Quan", "Jamie Lee Curtis"],
        runtime: "139 min",
        genres: ["Adventure", "Comedy", "Sci-Fi"],
        rating: 8.8,
        poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=1080&fit=crop",
        description: "A middle-aged Chinese immigrant is swept up into an insane adventure where she alone can save the existence by exploring other universes.",
        fullReview: "A mind-bending, heart-shattering masterpiece that defies categorization. The Daniels have crafted a film that juggles multiverse chaos with profound emotional truth about family, identity, and the meaning of existence. Michelle Yeoh delivers the performance of a lifetime, seamlessly transitioning between action hero, comedic lead, and dramatic powerhouse. The film's creativity is boundless—hot dog fingers, sentient rocks, and everything bagel black holes somehow coalesce into a deeply moving meditation on love and purpose.",
        ratings: { story: 9.0, acting: 9.2, direction: 9.1, cinematography: 8.0, entertainment: 9.5 },
        pros: ["Michelle Yeoh's phenomenal performance", "Boundless creativity", "Emotionally resonant", "Genre-defying storytelling"],
        cons: ["Can be overwhelming", "Some humor doesn't land"],
        trailer: "https://www.youtube.com/embed/wxN1T1uxQ2g",
        similar: [7, 11, 14]
    },
    {
        id: 5,
        title: "Killers of the Flower Moon",
        year: 2023,
        director: "Martin Scorsese",
        cast: ["Leonardo DiCaprio", "Robert De Niro", "Lily Gladstone", "Jesse Plemons"],
        runtime: "206 min",
        genres: ["Crime", "Drama", "History"],
        rating: 8.5,
        poster: "https://images.unsplash.com/photo-1594909122849-11e29194f11c?w=400&h=600&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
        description: "Real love crosses paths with unspeakable betrayal as Mollie Burkhart fights for survival as her Osage family is murdered for their oil wealth.",
        fullReview: "Scorsese's epic Western crime drama is a haunting indictment of American greed and racism. At 206 minutes, the film takes its time establishing the complex web of relationships in 1920s Oklahoma, where the Osage Nation's oil wealth made them targets. Leonardo DiCaprio delivers a career-best performance as the morally compromised Ernest Burkhart, while Lily Gladstone's quiet, powerful presence as Mollie anchors the film's emotional core. It's a devastating, necessary work from a master filmmaker in his twilight years.",
        ratings: { story: 9.0, acting: 9.3, direction: 9.0, cinematography: 8.7, entertainment: 7.8 },
        pros: ["Powerful performances across the board", "Important historical story", "Scorsese's masterful direction", "Stunning period detail"],
        cons: ["Very long runtime", "Slow pacing in parts"],
        trailer: "https://www.youtube.com/embed/EP34Yoxs3FQ",
        similar: [1, 8, 10]
    },
    {
        id: 6,
        title: "Spider-Man: Across the Spider-Verse",
        year: 2023,
        director: "Joaquim Dos Santos, Kemp Powers, Justin K. Thompson",
        cast: ["Shameik Moore", "Hailee Steinfeld", "Brian Tyree Henry", "Luna Lauren Velez"],
        runtime: "140 min",
        genres: ["Animation", "Action", "Adventure"],
        rating: 8.9,
        poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1920&h=1080&fit=crop",
        description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its existence.",
        fullReview: "A revolutionary achievement in animation that pushes the medium to breathtaking new heights. Across the Spider-Verse is not just a sequel—it's a quantum leap forward in visual storytelling. Each universe has its own distinct art style, from the watercolor dreamscapes of Gwen's world to the punk-rock aesthetic of Hobie Brown. The film balances its visual spectacle with genuine emotional stakes, exploring themes of identity, sacrifice, and what it means to be a hero. It's a stunning middle chapter that leaves audiences desperate for the conclusion.",
        ratings: { story: 8.7, acting: 8.5, direction: 9.0, cinematography: 9.8, entertainment: 9.3 },
        pros: ["Groundbreaking animation", "Diverse visual styles", "Emotionally powerful", "Incredible action sequences"],
        cons: ["Ends on a cliffhanger", "Can be visually overwhelming"],
        trailer: "https://www.youtube.com/embed/shW9i6k8cB0",
        similar: [4, 11, 14]
    },
    {
        id: 7,
        title: "Poor Things",
        year: 2023,
        director: "Yorgos Lanthimos",
        cast: ["Emma Stone", "Willem Dafoe", "Mark Ruffalo", "Ramy Youssef"],
        runtime: "141 min",
        genres: ["Comedy", "Drama", "Romance"],
        rating: 8.3,
        poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?w=1920&h=1080&fit=crop",
        description: "The incredible tale and fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant Dr. Godwin Baxter.",
        fullReview: "Yorgos Lanthimos crafts a wildly imaginative, deeply feminist fable that is as hilarious as it is provocative. Emma Stone delivers a fearless, transformative performance as Bella Baxter—a woman with the brain of an infant who rapidly evolves into an independent, sexually liberated being. The film's fisheye lenses and surreal production design create a unique visual language, while the script tackles themes of autonomy, patriarchy, and bodily freedom with sharp wit. It's bizarre, beautiful, and utterly unforgettable.",
        ratings: { story: 8.5, acting: 9.0, direction: 8.8, cinematography: 8.9, entertainment: 8.2 },
        pros: ["Emma Stone's fearless performance", "Unique visual style", "Sharp feminist themes", "Hilarious and provocative"],
        cons: ["Not for all tastes", "Deliberately strange tone"],
        trailer: "https://www.youtube.com/embed/RlbR5N6veqw",
        similar: [4, 11, 13]
    },
    {
        id: 8,
        title: "Blade Runner 2049",
        year: 2017,
        director: "Denis Villeneuve",
        cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas", "Sylvia Hoeks"],
        runtime: "164 min",
        genres: ["Sci-Fi", "Drama", "Thriller"],
        rating: 8.5,
        poster: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=600&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop",
        description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.",
        fullReview: "A rare sequel that not only honors its predecessor but stands as a masterpiece in its own right. Villeneuve and cinematographer Roger Deakins create a visual feast of neon-drenched dystopia that is both haunting and beautiful. Ryan Gosling's restrained performance as Officer K perfectly complements the film's meditative pace. The film explores themes of identity, memory, and what it means to be human with philosophical depth. Every frame is a work of art, and the haunting score by Hans Zimmer and Benjamin Wallfisch completes the immersive experience.",
        ratings: { story: 8.6, acting: 8.4, direction: 9.1, cinematography: 9.7, entertainment: 8.0 },
        pros: ["Stunning cinematography", "Atmospheric world-building", "Philosophical depth", "Roger Deakins' masterwork"],
        cons: ["Slow pacing", "Runtime may test patience"],
        trailer: "https://www.youtube.com/embed/gCcx85zbxz4",
        similar: [2, 12, 15]
    },
    {
        id: 9,
        title: "The Dark Knight",
        year: 2008,
        director: "Christopher Nolan",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
        runtime: "152 min",
        genres: ["Action", "Crime", "Drama"],
        rating: 9.2,
        poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920&h=1080&fit=crop",
        description: "When the menace known as the Joker wreaks havoc and chaos on Gotham, Batman must accept one of the greatest psychological tests.",
        fullReview: "The definitive superhero film and a crime epic that transcends its genre. Heath Ledger's Joker is one of cinema's greatest villains—a force of anarchic chaos that challenges Batman's very existence. Nolan crafts a complex moral thriller that explores the cost of heroism and the thin line between order and chaos. The IMAX sequences are still breathtaking, and Hans Zimmer's score creates unbearable tension. It's a film that works as blockbuster entertainment and serious drama simultaneously.",
        ratings: { story: 9.0, acting: 9.5, direction: 9.2, cinematography: 8.8, entertainment: 9.3 },
        pros: ["Heath Ledger's iconic Joker", "Complex moral themes", "Thrilling action sequences", "Exceptional score"],
        cons: ["Two-Face arc feels slightly rushed", "Some dialogue is on-the-nose"],
        trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
        similar: [3, 15, 1]
    },
    {
        id: 10,
        title: "Parasite",
        year: 2019,
        director: "Bong Joon-ho",
        cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
        runtime: "132 min",
        genres: ["Comedy", "Drama", "Thriller"],
        rating: 8.9,
        poster: "https://images.unsplash.com/photo-1596727147705-54a9d750e718?w=400&h=600&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        fullReview: "A perfect film that operates on multiple levels—as social satire, dark comedy, thriller, and tragedy. Bong Joon-ho masterfully controls tone, shifting seamlessly from hilarious to horrifying without missing a beat. The production design brilliantly contrasts the two families' living spaces, and the performances are universally excellent. Parasite is a scathing indictment of capitalism that never feels preachy, instead using genre conventions to deliver its message with devastating impact. Deservedly historic.",
        ratings: { story: 9.3, acting: 9.0, direction: 9.4, cinematography: 8.7, entertainment: 9.1 },
        pros: ["Masterful tonal shifts", "Sharp social commentary", "Brilliant production design", "Perfect pacing"],
        cons: ["Very few—near flawless"],
        trailer: "https://www.youtube.com/embed/SEUXfv87Wpk",
        similar: [5, 11, 13]
    },
    {
        id: 11,
        title: "The Grand Budapest Hotel",
        year: 2014,
        director: "Wes Anderson",
        cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric", "Adrien Brody"],
        runtime: "99 min",
        genres: ["Adventure", "Comedy", "Crime"],
        rating: 8.4,
        poster: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=400&h=600&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&h=1080&fit=crop",
        description: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy.",
        fullReview: "Wes Anderson's most perfectly realized film is a confection of impeccable craft and genuine emotion. Ralph Fiennes gives a career-highlight performance as Monsieur Gustave H., a concierge of old-world elegance navigating a changing Europe. The film's aspect ratio shifts, candy-colored production design, and precise compositions create a unique visual language. Beneath the stylized surface lies a poignant meditation on nostalgia, friendship, and the end of an era. It's funny, sad, and utterly gorgeous.",
        ratings: { story: 8.5, acting: 8.8, direction: 9.0, cinematography: 9.2, entertainment: 8.7 },
        pros: ["Ralph Fiennes' delightful performance", "Stunning visual design", "Witty, quotable script", "Perfect comedic timing"],
        cons: ["Style may overshadow substance for some", "Deliberately artificial tone"],
        trailer: "https://www.youtube.com/embed/1Fg5iWmQjwk",
        similar: [4, 7, 14]
    },
    {
        id: 12,
        title: "Interstellar",
        year: 2014,
        director: "Christopher Nolan",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
        runtime: "169 min",
        genres: ["Sci-Fi", "Adventure", "Drama"],
        rating: 8.7,
        poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&h=1080&fit=crop",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        fullReview: "Nolan's most emotionally ambitious film is a sweeping space epic that balances hard science with profound human emotion. Matthew McConaughey delivers a heart-wrenching performance as a father torn between saving humanity and returning to his daughter. The visual effects—particularly the black hole Gargantua—are groundbreaking, and Hans Zimmer's organ-heavy score is transcendent. While the third act's dive into metaphysics divides audiences, the film's emotional core—love as a force transcending space and time—resonates deeply.",
        ratings: { story: 8.5, acting: 8.6, direction: 8.8, cinematography: 9.3, entertainment: 8.5 },
        pros: ["Emotionally powerful", "Groundbreaking visuals", "Hans Zimmer's incredible score", "Ambitious scope"],
        cons: ["Third act is divisive", "Some exposition is heavy-handed"],
        trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
        similar: [2, 8, 1]
    },
    {
        id: 13,
        title: "La La Land",
        year: 2016,
        director: "Damien Chazelle",
        cast: ["Ryan Gosling", "Emma Stone", "Rosemarie DeWitt", "J.K. Simmons"],
        runtime: "128 min",
        genres: ["Comedy", "Drama", "Music"],
        rating: 8.4,
        poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=1080&fit=crop",
        description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations.",
        fullReview: "A magical, melancholic love letter to dreams, Los Angeles, and the musicals of Hollywood's golden age. Damien Chazelle balances crowd-pleasing musical numbers with a bittersweet, realistic portrayal of ambition and compromise. Emma Stone and Ryan Gosling have wonderful chemistry, and their performances—particularly Stone's—anchor the film's emotional journey. The opening freeway number and the planetarium dance are pure cinematic joy, while the finale delivers one of the most devastating emotional punches in modern cinema.",
        ratings: { story: 8.3, acting: 8.5, direction: 8.7, cinematography: 8.9, entertainment: 8.6 },
        pros: ["Stunning musical numbers", "Emma Stone's performance", "Beautiful LA cinematography", "Bittersweet, honest ending"],
        cons: ["Gosling's singing is adequate at best", "Some find it overly sentimental"],
        trailer: "https://www.youtube.com/embed/0pdqf4P9MB8",
        similar: [7, 11, 4]
    },
    {
        id: 14,
        title: "Mad Max: Fury Road",
        year: 2015,
        director: "George Miller",
        cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult", "Hugh Keays-Byrne"],
        runtime: "120 min",
        genres: ["Action", "Adventure", "Sci-Fi"],
        rating: 8.6,
        poster: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=600&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1542256844-d84c7a0f35e9?w=1920&h=1080&fit=crop",
        description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners.",
        fullReview: "A high-octane masterpiece that redefined action cinema. George Miller, at 70 years old, crafted the most viscerally thrilling film of the decade—a two-hour chase sequence that never lets up. Charlize Theron's Furiosa is an iconic action hero, and the film's practical effects and stunt work put CGI-heavy blockbusters to shame. Beneath the explosions lies a surprisingly feminist narrative about bodily autonomy and redemption. The editing is propulsive, the production design is insane, and the result is pure adrenaline.",
        ratings: { story: 8.0, acting: 8.3, direction: 9.2, cinematography: 8.8, entertainment: 9.5 },
        pros: ["Mind-blowing practical stunts", "Charlize Theron's Furiosa", "Relentless pacing", "Stunning practical effects"],
        cons: ["Minimal dialogue", "Plot is simple"],
        trailer: "https://www.youtube.com/embed/hEJnMQG9ev8",
        similar: [6, 3, 15]
    },
    {
        id: 15,
        title: "Inception",
        year: 2010,
        director: "Christopher Nolan",
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
        runtime: "148 min",
        genres: ["Action", "Sci-Fi", "Thriller"],
        rating: 8.8,
        poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
        fullReview: "Nolan's dream-heist thriller remains a towering achievement in blockbuster filmmaking. The film constructs multiple layers of reality with clockwork precision, creating set pieces—the rotating hallway fight, the folding city, the zero-gravity hotel—that are endlessly rewatchable. Leonardo DiCaprio grounds the cerebral concept with genuine emotional stakes as a man haunted by his past. Hans Zimmer's score, particularly the iconic BRAAAM, has become synonymous with epic cinema. It's a film that rewards repeat viewings and continues to spark debate about its ambiguous ending.",
        ratings: { story: 9.0, acting: 8.4, direction: 9.1, cinematography: 8.9, entertainment: 9.0 },
        pros: ["Mind-bending concept", "Iconic action set pieces", "Hans Zimmer's legendary score", "Ambiguous, debated ending"],
        cons: ["Can be emotionally cold", "Some find it overly complex"],
        trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
        similar: [9, 12, 8]
    }
];

const categories = [
    { name: "Action", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=250&fit=crop" },
    { name: "Adventure", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=250&fit=crop" },
    { name: "Comedy", image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=250&fit=crop" },
    { name: "Drama", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=250&fit=crop" },
    { name: "Horror", image: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?w=400&h=250&fit=crop" },
    { name: "Sci-Fi", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop" },
    { name: "Romance", image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&h=250&fit=crop" },
    { name: "Thriller", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=250&fit=crop" },
    { name: "Animation", image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=250&fit=crop" }
];

const defaultReviews = [
    {
        id: 1,
        movieId: 1,
        reviewer: "Sarah Mitchell",
        rating: 9.2,
        text: "Oppenheimer is a towering achievement. Nolan has crafted a film that is as intellectually rigorous as it is emotionally devastating. Cillian Murphy's performance is simply extraordinary.",
        date: "2023-07-25",
        label: "masterpiece"
    },
    {
        id: 2,
        movieId: 9,
        reviewer: "James Rodriguez",
        rating: 9.5,
        text: "The Dark Knight remains the gold standard for superhero films. Heath Ledger's Joker is transcendent—terrifying, mesmerizing, and utterly unforgettable.",
        date: "2023-08-10",
        label: "masterpiece"
    },
    {
        id: 3,
        movieId: 10,
        reviewer: "Emily Chen",
        rating: 9.0,
        text: "Parasite is a perfect film. Bong Joon-ho's mastery of tone is unmatched—he can make you laugh, gasp, and cry within the same scene. A historic achievement.",
        date: "2023-09-05",
        label: "masterpiece"
    },
    {
        id: 4,
        movieId: 4,
        reviewer: "Michael Torres",
        rating: 8.8,
        text: "Everything Everywhere All at Once is pure cinematic magic. Michelle Yeoh deserves every award for this performance. The hot dog fingers scene made me cry.",
        date: "2023-08-22",
        label: "excellent"
    },
    {
        id: 5,
        movieId: 6,
        reviewer: "Lisa Park",
        rating: 9.1,
        text: "Spider-Verse pushes animation into entirely new territory. Every frame is a work of art, and the emotional core hits harder than most live-action films.",
        date: "2023-09-15",
        label: "masterpiece"
    },
    {
        id: 6,
        movieId: 2,
        reviewer: "David Kim",
        rating: 8.6,
        text: "Dune Part Two is an epic in every sense of the word. The desert visuals are breathtaking, and the political intrigue adds real depth to the spectacle.",
        date: "2024-03-10",
        label: "excellent"
    }
];

// ============================================
// STATE
// ============================================

let favorites = JSON.parse(localStorage.getItem('mw_favorites')) || [];
let userReviews = JSON.parse(localStorage.getItem('mw_reviews')) || [];
let currentTheme = localStorage.getItem('mw_theme') || 'dark';

// ============================================
// DOM ELEMENTS
// ============================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearSearch = document.getElementById('clearSearch');
const moviesGrid = document.getElementById('moviesGrid');
const reviewsGrid = document.getElementById('reviewsGrid');
const categoriesGrid = document.getElementById('categoriesGrid');
const favoritesGrid = document.getElementById('favoritesGrid');
const noResults = document.getElementById('noResults');
const noFavorites = document.getElementById('noFavorites');
const backToTop = document.getElementById('backToTop');
const scrollProgress = document.getElementById('scrollProgress');
const heroBg = document.getElementById('heroBg');
const heroReviewBtn = document.getElementById('heroReviewBtn');
const heroTrailerBtn = document.getElementById('heroTrailerBtn');
const movieModal = document.getElementById('movieModal');
const trailerModal = document.getElementById('trailerModal');
const writeReviewModal = document.getElementById('writeReviewModal');
const modalBody = document.getElementById('modalBody');
const trailerContainer = document.getElementById('trailerContainer');
const reviewForm = document.getElementById('reviewForm');
const reviewMovieSelect = document.getElementById('reviewMovieSelect');
const reviewRating = document.getElementById('reviewRating');
const ratingValue = document.getElementById('ratingValue');
const toastContainer = document.getElementById('toast-container');
const loadingScreen = document.getElementById('loading-screen');

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getScoreLabel(score) {
    if (score >= 9.0) return { text: 'Masterpiece', class: 'masterpiece' };
    if (score >= 8.0) return { text: 'Excellent', class: 'excellent' };
    if (score >= 7.0) return { text: 'Good', class: 'good' };
    if (score >= 6.0) return { text: 'Average', class: 'average' };
    return { text: 'Poor', class: 'poor' };
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
    toast.innerHTML = `<i class="fas ${icons[type]}"></i><span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function getMovieById(id) {
    return movies.find(m => m.id === id);
}

function isFavorite(movieId) {
    return favorites.includes(movieId);
}

function toggleFavorite(movieId) {
    const index = favorites.indexOf(movieId);
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('Removed from favorites', 'info');
    } else {
        favorites.push(movieId);
        showToast('Added to favorites', 'success');
    }
    localStorage.setItem('mw_favorites', JSON.stringify(favorites));
    renderFavorites();
    renderMovies(movies);
}

// ============================================
// RENDER FUNCTIONS
// ============================================

function renderMovies(movieList) {
    if (movieList.length === 0) {
        moviesGrid.innerHTML = '';
        noResults.classList.add('visible');
        return;
    }

    noResults.classList.remove('visible');
    moviesGrid.innerHTML = movieList.map(movie => `
        <div class="movie-card fade-in" data-id="${movie.id}">
            <div class="movie-poster">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                <div class="movie-rating-badge">
                    <i class="fas fa-star"></i> ${movie.rating}
                </div>
                <button class="movie-favorite ${isFavorite(movie.id) ? 'active' : ''}" data-id="${movie.id}">
                    <i class="fas fa-heart"></i>
                </button>
                <div class="movie-poster-overlay">
                    <button class="view-review-btn" data-id="${movie.id}">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                </div>
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span>${movie.year}</span>
                    <span class="movie-genre">${movie.genres[0]}</span>
                </div>
                <div class="movie-review-indicator">
                    <span>Rating</span>
                    <div class="indicator-bar">
                        <div class="indicator-fill" style="width: ${movie.rating * 10}%"></div>
                    </div>
                    <span>${movie.rating}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners
    document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.movie-favorite')) {
                const id = parseInt(card.dataset.id);
                openMovieModal(id);
            }
        });
    });

    document.querySelectorAll('.movie-favorite').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            toggleFavorite(id);
        });
    });

    document.querySelectorAll('.view-review-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            openMovieModal(id);
        });
    });

    // Trigger scroll animations
    observeElements();
}

function renderReviews() {
    const allReviews = [...defaultReviews, ...userReviews].sort((a, b) => new Date(b.date) - new Date(a.date));

    reviewsGrid.innerHTML = allReviews.map(review => {
        const movie = getMovieById(review.movieId);
        if (!movie) return '';
        const label = getScoreLabel(review.rating);
        const stars = '★'.repeat(Math.floor(review.rating / 2)) + (review.rating % 2 >= 1 ? '½' : '');

        return `
            <div class="review-card fade-in">
                <div class="review-header">
                    <div class="review-poster">
                        <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                    </div>
                    <div class="review-header-info">
                        <h3 class="review-movie-title">${movie.title}</h3>
                        <div class="review-date">${formatDate(review.date)}</div>
                        <div class="review-score">
                            <span class="review-score-value">${review.rating}</span>
                            <span class="review-score-label ${label.class}">${label.text}</span>
                        </div>
                    </div>
                </div>
                <div class="review-stars">${stars}</div>
                <p class="review-excerpt">${review.text}</p>
                <button class="read-full-btn" data-id="${movie.id}">
                    Read Full Review <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
    }).join('');

    document.querySelectorAll('.read-full-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            openMovieModal(parseInt(btn.dataset.id));
        });
    });

    observeElements();
}

function renderCategories() {
    categoriesGrid.innerHTML = categories.map(cat => `
        <div class="category-card fade-in" data-category="${cat.name}">
            <div class="category-bg" style="background-image: url('${cat.image}')"></div>
            <div class="category-overlay">
                <span class="category-name">${cat.name}</span>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            const filtered = movies.filter(m => m.genres.includes(category));
            renderMovies(filtered);
            document.getElementById('trending').scrollIntoView({ behavior: 'smooth' });
            showToast(`Showing ${category} movies`, 'info');
        });
    });

    observeElements();
}

function renderFavorites() {
    const favMovies = movies.filter(m => favorites.includes(m.id));

    if (favMovies.length === 0) {
        favoritesGrid.innerHTML = '';
        noFavorites.classList.add('visible');
        return;
    }

    noFavorites.classList.remove('visible');
    favoritesGrid.innerHTML = favMovies.map(movie => `
        <div class="movie-card fade-in" data-id="${movie.id}">
            <div class="movie-poster">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                <div class="movie-rating-badge">
                    <i class="fas fa-star"></i> ${movie.rating}
                </div>
                <button class="movie-favorite active" data-id="${movie.id}">
                    <i class="fas fa-heart"></i>
                </button>
                <div class="movie-poster-overlay">
                    <button class="view-review-btn" data-id="${movie.id}">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                </div>
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span>${movie.year}</span>
                    <span class="movie-genre">${movie.genres[0]}</span>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('#favorites .movie-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.movie-favorite')) {
                openMovieModal(parseInt(card.dataset.id));
            }
        });
    });

    document.querySelectorAll('#favorites .movie-favorite').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(parseInt(btn.dataset.id));
        });
    });

    observeElements();
}

function populateReviewSelect() {
    reviewMovieSelect.innerHTML = '<option value="">Select a movie</option>' +
        movies.map(m => `<option value="${m.id}">${m.title} (${m.year})</option>`).join('');
}

// ============================================
// MODAL FUNCTIONS
// ============================================

function openMovieModal(movieId) {
    const movie = getMovieById(movieId);
    if (!movie) return;

    const label = getScoreLabel(movie.rating);
    const similarMovies = movie.similar.map(id => getMovieById(id)).filter(Boolean);

    modalBody.innerHTML = `
        <div class="movie-modal-body">
            <div class="movie-modal-poster">
                <img src="${movie.poster}" alt="${movie.title}">
            </div>
            <div class="movie-modal-info">
                <h2 class="movie-modal-title">${movie.title}</h2>
                <div class="movie-modal-meta">
                    <span><i class="fas fa-calendar"></i> ${movie.year}</span>
                    <span><i class="fas fa-clock"></i> ${movie.runtime}</span>
                    <span><i class="fas fa-star"></i> ${movie.rating}/10</span>
                    <span><i class="fas fa-user"></i> ${movie.director}</span>
                </div>
                <div class="movie-modal-genres">
                    ${movie.genres.map(g => `<span class="genre-tag">${g}</span>`).join('')}
                </div>
                <p class="movie-modal-description">${movie.description}</p>
                <p class="movie-modal-description">${movie.fullReview}</p>

                <div class="rating-breakdown">
                    <h4>Rating Breakdown</h4>
                    ${Object.entries(movie.ratings).map(([key, val]) => `
                        <div class="rating-item">
                            <span class="rating-label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                            <div class="rating-bar">
                                <div class="rating-fill" style="width: 0%"></div>
                            </div>
                            <span class="rating-value-text">${val}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="pros-cons">
                    <div class="pros">
                        <h4><i class="fas fa-thumbs-up"></i> Pros</h4>
                        <ul>
                            ${movie.pros.map(p => `<li><i class="fas fa-check" style="color: #4ade80;"></i> ${p}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="cons">
                        <h4><i class="fas fa-thumbs-down"></i> Cons</h4>
                        <ul>
                            ${movie.cons.map(c => `<li><i class="fas fa-times" style="color: #f87171;"></i> ${c}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="hero-buttons">
                    <button class="btn btn-primary" onclick="openTrailerModal(${movie.id})">
                        <i class="fas fa-play"></i> Watch Trailer
                    </button>
                    <button class="btn btn-outline" onclick="toggleFavorite(${movie.id}); openMovieModal(${movie.id});">
                        <i class="fas fa-heart"></i> ${isFavorite(movie.id) ? 'Remove Favorite' : 'Add Favorite'}
                    </button>
                </div>

                ${similarMovies.length > 0 ? `
                    <div class="similar-movies">
                        <h4>Similar Movies</h4>
                        <div class="similar-grid">
                            ${similarMovies.map(m => `
                                <div class="similar-movie" onclick="openMovieModal(${m.id})">
                                    <img src="${m.poster}" alt="${m.title}">
                                    <div class="similar-movie-title">${m.title}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;

    movieModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Animate rating bars
    setTimeout(() => {
        document.querySelectorAll('.rating-fill').forEach((bar, i) => {
            const values = Object.values(movie.ratings);
            bar.style.width = `${values[i] * 10}%`;
        });
    }, 300);
}

function closeMovieModal() {
    movieModal.classList.remove('active');
    document.body.style.overflow = '';
}

function openTrailerModal(movieId) {
    const movie = getMovieById(movieId);
    if (!movie) return;

    trailerContainer.innerHTML = `<iframe src="${movie.trailer}" allowfullscreen></iframe>`;
    trailerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeTrailerModal() {
    trailerModal.classList.remove('active');
    trailerContainer.innerHTML = '';
    document.body.style.overflow = '';
}

function openWriteReviewModal() {
    populateReviewSelect();
    writeReviewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeWriteReviewModal() {
    writeReviewModal.classList.remove('active');
    document.body.style.overflow = '';
    reviewForm.reset();
    ratingValue.textContent = '8.0';
}

// ============================================
// SEARCH
// ============================================

function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();

    if (query.length > 0) {
        clearSearch.classList.add('visible');
        const filtered = movies.filter(m => 
            m.title.toLowerCase().includes(query) ||
            m.director.toLowerCase().includes(query) ||
            m.genres.some(g => g.toLowerCase().includes(query)) ||
            m.cast.some(c => c.toLowerCase().includes(query))
        );
        renderMovies(filtered);
        document.getElementById('trending').scrollIntoView({ behavior: 'smooth' });
    } else {
        clearSearch.classList.remove('visible');
        renderMovies(movies);
    }
}

function clearSearchHandler() {
    searchInput.value = '';
    clearSearch.classList.remove('visible');
    renderMovies(movies);
}

// ============================================
// THEME
// ============================================

function initTheme() {
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('mw_theme', currentTheme);
    themeToggle.innerHTML = currentTheme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    showToast(`Switched to ${currentTheme} mode`, 'info');
}

// ============================================
// SCROLL & NAVIGATION
// ============================================

function handleScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollY / docHeight) * 100;

    scrollProgress.style.width = scrollPercent + '%';

    // Navbar
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top
    if (scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ============================================
// EVENT LISTENERS
// ============================================

function initEventListeners() {
    // Navigation
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Theme
    themeToggle.addEventListener('click', toggleTheme);

    // Search
    searchInput.addEventListener('input', handleSearch);
    searchBtn.addEventListener('click', handleSearch);
    clearSearch.addEventListener('click', clearSearchHandler);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Scroll
    window.addEventListener('scroll', handleScroll);

    // Back to top
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Hero buttons
    heroReviewBtn.addEventListener('click', () => openMovieModal(1));
    heroTrailerBtn.addEventListener('click', () => openTrailerModal(1));

    // Modals
    document.getElementById('modalClose').addEventListener('click', closeMovieModal);
    document.getElementById('trailerClose').addEventListener('click', closeTrailerModal);
    document.getElementById('reviewModalClose').addEventListener('click', closeWriteReviewModal);

    movieModal.querySelector('.modal-backdrop').addEventListener('click', closeMovieModal);
    trailerModal.querySelector('.modal-backdrop').addEventListener('click', closeTrailerModal);
    writeReviewModal.querySelector('.modal-backdrop').addEventListener('click', closeWriteReviewModal);

    // Review form
    reviewRating.addEventListener('input', (e) => {
        ratingValue.textContent = parseFloat(e.target.value).toFixed(1);
    });

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const movieId = parseInt(reviewMovieSelect.value);
        const name = document.getElementById('reviewerName').value;
        const rating = parseFloat(reviewRating.value);
        const text = document.getElementById('reviewText').value;

        if (!movieId) {
            showToast('Please select a movie', 'error');
            return;
        }

        const newReview = {
            id: Date.now(),
            movieId,
            reviewer: name,
            rating,
            text,
            date: new Date().toISOString().split('T')[0],
            label: getScoreLabel(rating).class
        };

        userReviews.unshift(newReview);
        localStorage.setItem('mw_reviews', JSON.stringify(userReviews));

        renderReviews();
        closeWriteReviewModal();
        showToast('Review submitted successfully!', 'success');

        document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMovieModal();
            closeTrailerModal();
            closeWriteReviewModal();
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Set hero background
    heroBg.style.backgroundImage = `url('${movies[0].backdrop}')`;

    // Initialize theme
    initTheme();

    // Render content
    renderMovies(movies);
    renderReviews();
    renderCategories();
    renderFavorites();
    populateReviewSelect();

    // Setup events
    initEventListeners();

    // Hide loading screen
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);

    // Initial scroll check
    handleScroll();
}

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
