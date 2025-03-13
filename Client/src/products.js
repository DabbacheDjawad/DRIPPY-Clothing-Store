import baggyJeans1 from "./assets/images/baggyJeans1.jpg";
import baggyJeans2 from "./assets/images/baggyJeans2.jpeg";
import baggyJeans3 from "./assets/images/baggyJeans3.png";
import baseballJacketBlack from "./assets/images/baseballJacketBlack.jpeg";
import baseballJacketBrown from "./assets/images/baseballJacketBrown.webp";
import baseballJacketGreen from "./assets/images/baseballJacketGreen.jpeg";
import baseballJacketRed from "./assets/images/baseballJacketRed.jpeg";
import bigJacketBlack from "./assets/images/bigJacketBlack.jpg";
import bigJacketGreen from "./assets/images/bigJacketGreen.jpeg";
import bigJacketPurple from "./assets/images/bigJacketPurple.jpeg";
import blackChelseaBoots from "./assets/images/blackChelseaBoots.webp";
import cremeChelseaBoots from "./assets/images/cremeChelseaBoots.png";
import cremeChelseaBoots2 from "./assets/images/cremeChelseaBoots2.jpeg";
import harshBoots from "./assets/images/harshBoots.jpg";
import highJordan1Red from "./assets/images/highJordan1Red.jpeg";
import highJordan1Yellow from "./assets/images/highJordan1Yellow.jpg";
import hikingShoes from "./assets/images/hikingShoes.jpg";
import hikingShoes2 from "./assets/images/hikingShoes2.jpg";
import hoodyBlack from "./assets/images/hoodyBlack.jpg";
import hoodyBlue from "./assets/images/hoodyBlue.jpeg";
import hoodyRed from "./assets/images/hoodyRed.jpeg";
import hoodyStrongBlue from "./assets/images/hoodyStrongBlue.jpeg";
import hoodyWhite from "./assets/images/hoodyWhite.jpeg";
import jordan4 from "./assets/images/jordan4.jpeg";
import largeLeatherJacketBlack from "./assets/images/largeLeatherJacketBlack.jpg";
import largeLetherJacketBrown from "./assets/images/largeLetherJacketBrown.webp";
import regularJeans1 from "./assets/images/regularJeans1.webp";
import regularJeans2 from "./assets/images/regularJeans2.jpeg";
import regularJeans3 from "./assets/images/regularJeans3.webp";
import runningShoesBlue from "./assets/images/runningShoesBlue.jpg";
import runningShoesGrey from "./assets/images/runningShoesGrey.jpg";
import runningShoesPink from "./assets/images/runningShoesPink.jpg";
import runningShoesRed from "./assets/images/runningShoesRed.jpg";
import runningShoesYellow from "./assets/images/runningShoesYellow.jpg";
import SemiClassicShoes from "./assets/images/SemiClassicShoes.jpg";
import slimLetherJacketBlack from "./assets/images/slimLetherJacketBlack.jpg";
import slimLetherJacketBrown from "./assets/images/slimLetherJacketBrown.jpg";
import sweatShirtGrey from "./assets/images/sweatShirtGrey.webp";
import sweatShirtWhite from "./assets/images/sweatShirtWhite.jpg";
import sweatShirtBlack from "./assets/images/sweatSirtBlack.jpeg";
import tShirtBlack from "./assets/images/tShirtBlack.png";
import tShirtBlue from "./assets/images/tShirtBlue.png";
import tShirtWhite from "./assets/images/tShirtWhite.jpeg";

const products = [
  {
    name: "Simple Comfy Sweater",
    price: "2000 DZD",
    category: "shirts",
    availableSizes: ["S", "M", "L", "XL"],
    available: true,
    images: [sweatShirtGrey, sweatShirtWhite, sweatShirtBlack],
    description: `a sweater, which is a type
         of long-sleeved top. The sweater is made of a soft, comfortable
        fabric, likely cotton or a cotton blend. The color of the sweater
        is a solid black, giving it a classic and versatile appearance.
        The sweater appears to be a pullover style, featuring a simple design
        without any patterns or intricate details. The size of the sweater is
        large, making it suitable for a wide range of body types and providing
        ample coverage. Overall, the sweater is a cozy and stylish choice for
        colder weather or as a layering piece in a wardrobe.`,
  },
  {
    name: "Simple Styleless T-shirt",
    price: "1500 DZD",
    category: "shirts",
    availableSizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    available: true,
    images: [tShirtBlack, tShirtBlue, tShirtWhite, ""],
    description: `simple t-shirt, which is
        a casual and comfortable piece of clothing. it is made of a soft fabric,
        likely cotton or a cotton-blend material, and has a smooth texture. It is a short-sleeved shirt,
        suitable for warm weather or casual wear. The t-shirt is designed to be worn as a standalone 
        garment, without the need for additional layers. It is a simple and classic style that can
        be easily paired with various outfits, making it a versatile choice for everyday wear.`,
  },
  {
    name: "Baggy Hoody",
    price: "3000 DZD",
    category: "shirts",
    availableSizes: ["S", "M", "L", "XL"],
    available: true,
    images: [hoodyBlack, hoodyBlue, hoodyRed, hoodyStrongBlue, hoodyWhite],
    description: `this is a hooded sweatshirt, which is a
     type of casual clothing. The sweatshirt is made of a soft, comfortable
      fabric, likely a blend of cotton and polyester. The hood is a distinctive
     feature of the sweatshirt, providing a cozy and functional touch. The sweatshirt
     is designed to be worn in colder weather or as a layering piece for added warmth.
     The overall style of the sweatshirt is casual and relaxed, making it suitable for everyday wear.`,
  },
  {
    name: "Slim Leather Jacket",
    price: "7000 DZD",
    category: "jackets",
    availableSizes: ["S", "M"],
    available: true,
    images: [slimLetherJacketBlack, slimLetherJacketBrown],
    description: `Slim leather jacket,
     known as motorcycle jacket. The jacket is
      made of high-quality leather and has a sleeveless design,
    showcasing the wearer's arms. it is made
    with a thick fabric, providing warmth and durability. The
    jacket is designed to be worn by a man, and it is displayed
    on a mannequin. The overall style of the jacket is sleek and
     stylish, making it an attractive choice for those who appreciate a classic motorcycle jacket.`,
  },
  {
    name: "Large Leather Jacket",
    price: "7500 DZD",
    category: "jackets",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    available: true,
    images: [largeLeatherJacketBlack, largeLetherJacketBrown],
    description: `Large leather
     jacket. it is made of smooth leather.
    It is stylish and well-fitted garment, suitable
    for colder weather or as a fashionable statement piece. The
    leather material gives the jacket a durable and sophisticated
    appearance, while the black color adds a touch of elegance and formality to the outfit.`,
  },
  {
    name: "Baseball jackets",
    price: "4000 DZD",
    category: "jackets",
    availableSizes: ["S", "M", "L", "XL"],
    available: true,
    images: [
      baseballJacketBlack,
      baseballJacketBrown,
      baseballJacketGreen,
      baseballJacketRed,
    ],
    description: `semi leather BaseBall jacket.
     The jacket has a zipper and a collar, giving it a stylish and sporty look. The brown and white
      color combination adds a touch of elegance to the overall appearance. The jacket is made of leather,
       which is a durable and high-quality material, often associated with a classic and timeless style. 
       The jacket is likely to be made of thick fabric, providing warmth and protection against the elements
        The size of the jacket is large, making it suitable for a wide range of body types and preferences.`,
  },
  {
    name: "Puffy Jacket",
    price: "6500 DZD",
    category: "jackets",
    availableSizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    available: true,
    images: [bigJacketBlack, bigJacketGreen, bigJacketPurple],
    description: `Puffy Jacket,or a winter coat, hanging on a hanger. The jacket is made 
     of a synthetic material(polyester), and has a thick
    texture to provide warmth and insulation during cold weather.
    The coat is designed with a hood to protect the wearer from
    wind and snow. The overall style of the jacket is simple and
     functional, making it suitable for everyday wear during the winter season.`,
  },
  {
    name: "Regular Jeans",
    price: "3500 DZD",
    category: "pants",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    available: true,
    images: [regularJeans2, regularJeans1, regularJeans3],
    description: `blue Regular jeans,
     which are a type of casual pants. The jeans have a
      light blue color and are made of denim fabric,
    giving them a classic and timeless appearance. The jeans
    are designed with a straight-leg style, which is a popular
    choice for a versatile and comfortable fit. The fabric of the
    jeans appears to be of a medium thickness, providing a balance
    between durability and comfort. The jeans are
     presented in a close-up view, allowing for a clear and detailed look at their texture and overall appearance.`,
  },
  {
    name: "Baggy Jeans",
    price: "5500 DZD",
    category: "pants",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    available: true,
    images: [baggyJeans1, baggyJeans2, baggyJeans3],
    description: `Large blue jeans,
     which are a type of casual pants. The jeans have a light
      blue color and are made of denim fabric. They have a classic
    style, with a straight-leg cut and a regular fit. The jeans 
    are designed to be worn as a standalone garment, without any
    additional layers. The fabric is soft and comfortable, making
    them suitable for everyday wear. The jeans are available in a 
    size that can accommodate a wide range of body types, ensuring 
    a good fit for most people.`,
  },
  {
    name: "Regular Harsh Boots",
    price: "6000 DZD",
    category: "shoes",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    available: true,
    images: [harshBoots],
    description: `black Work boots, with a leather upper and 
     a rubber sole. The boots have a lace-up design and are
    adorned with metal hardware, giving them a sturdy and
    durable appearance. The boots are placed on a white background,
    which highlights their color and texture. The overall style of
    the boots suggests that they are designed for practicality and 
    functionality, suitable for various work environments or outdoor activities.`,
  },
  {
    name: "Chelsea Boots",
    price: "5500 DZD",
    category: "shoes",
    availableSizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    available: true,
    images: [blackChelseaBoots, cremeChelseaBoots, cremeChelseaBoots2],
    description: `beige and Black chelsea boots, which are 
    a type of footwear. The boots have a classic style,and they have a smooth
    texture. The boots are designed to be worn with laces, which are visible in
    the image. The boots are placed on a white background, which highlights their
    color and texture. The overall appearance of the boots is elegant and versatile,
     making them suitable for various occasions and seasons.`,
  },
  {
    name: "Leather Hiking Shoes",
    price: "4500 DZD",
    category: "shoes",
    availableSizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    available: true,
    images: [hikingShoes, hikingShoes2],
    description: `Brown Merrell hiking shoes, The shoes have a rugged,
    outdoor-oriented design, with a thick sole and a durable fabric.
    They are designed for hiking and other outdoor activities, providing
    both comfort and support.`,
  },
  {
    name: "Classic Leather Semi Classic Shoes",
    price: "5000 DZD",
    category: "shoes",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    available: true,
    images: [SemiClassicShoes],
    description:`brown leather loafers. The shoes are made of
      high-quality leather and have a classic, timeless design.
    The leather is smooth and the shoes are well-crafted, with
    a comfortable fit. The overall appearance
    of the shoes is elegant and sophisticated, making them an excellent
    choice for formal or casual occasions.`
  },
  {
    name: "Running Shoes",
    price: "3500 DZD",
    category: "shoes",
    availableSizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    available: true,
    images: [
      runningShoesBlue,
      runningShoesGrey,
      runningShoesPink,
      runningShoesRed,
      runningShoesYellow,
    ],
    description:`nice and comfy running shoes, it has a mesh-like fabric, giving
      it a lightweight and breathable texture. The shoe is designed with
       a three-stripe pattern, which is a characteristic feature of Adidas and nike footwear.`
  },
  {
    name: "High Jordan1",
    price: "15000 DZD",
    category: "shoes",
    availableSizes: ["S", "M", "L"],
    available: true,
    images: [highJordan1Red, highJordan1Yellow],
    description:`Jordan 1's that are made of leather-like substance.
      they have a bright design, adding a pop of color to the overall
       design. The shoes are placed on a white surface, which provides 
       a clean and contrasting background for the sneakers. The sneakers
        are likely made of high-quality materials, providing both comfort and durability.`
  },
  {
    name: "Jordan 4",
    price: "12500 DZD",
    category: "shoes",
    availableSizes: ["S", "M"],
    available: true,
    images: [jordan4],
    description:`white and grey Nike Jordan 4's sneaker. 
    The shoe has a grey and white color scheme, with a black sole. The sneaker 
    is made of leather and mesh materials, providing a comfortable and durable fit
    . The shoe is designed with a cushioned sole, offering support and stability during wear
    . The Nike Air Max 90 is a classic and popular sneaker style, known for its breathable and comfortable design.`
  },
];

export default products;
