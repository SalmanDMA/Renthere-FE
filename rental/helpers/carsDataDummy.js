const carsData = [
  {
    id: 1,
    name: 'Honda CR-V Hybrid',
    image:
      'https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2022/07/13102850/Honda-CR-V-generasi-terbaru_0.jpg',
    category: 'Honda',
    description: `The Honda CR-V Hybrid is a top-tier hybrid SUV that seamlessly combines eco-friendliness with high-performance engineering. Designed with the environment in mind, this hybrid vehicle offers an impressive fuel efficiency that reduces your carbon footprint and helps you save on fuel costs. Its hybrid powertrain, consisting of a gasoline engine and an electric motor, ensures a smooth and responsive drive.
    Inside the Honda CR-V Hybrid, you'll find a spacious and comfortable cabin designed to accommodate both driver and passengers with ease. Premium materials and thoughtful design elements enhance the overall driving experience, making it perfect for long journeys and daily commutes alike.

    Safety is a top priority for Honda, and the CR-V Hybrid is equipped with advanced safety features to keep you and your loved ones protected on the road. From adaptive cruise control to lane-keeping assist, this SUV is designed to provide peace of mind in various driving conditions.

    With ample cargo space and versatile seating options, the Honda CR-V Hybrid is well-suited for your active lifestyle. Whether you're heading out for a weekend adventure or simply running errands in the city, this hybrid SUV offers the versatility and reliability you need.

    Experience the future of automotive technology with the Honda CR-V Hybrid. It's not just a vehicle; it's a sustainable and stylish driving solution that makes a positive impact on the environment while delivering the performance and comfort you expect from Honda.`,
    qty: 5,
    price: 35000,
  },
  {
    id: 2,
    name: 'Mitsubishi XFC / Mitsubishi Xforce',
    image:
      'https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2022/10/20100514/mitsubishi-xfc-test-drive.jpg',
    category: 'Mitsubishi',
    description: 'The Mitsubishi XFC is a stylish and modern crossover SUV.',
    qty: 8,
    price: 30000,
  },
  {
    id: 3,
    name: 'KIA EV9',
    image:
      'https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2023/05/26202257/2024-kia-ev9.jpg',
    category: 'KIA',
    description: 'The KIA EV9 is an all-electric SUV with advanced technology.',
    qty: 3,
    price: 50000,
  },
  {
    id: 4,
    name: 'Maxus MIFA 9',
    image:
      'https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2023/01/17115354/mpv-mg-mifa-9.jpg',
    category: 'Maxus',
    description: `The Maxus MIFA 9 is a spacious and versatile MPV designed to meet the diverse needs of modern families. With its roomy interior and flexible seating options, the MIFA 9 offers ample space for passengers and cargo, making it the perfect choice for family adventures and daily commutes. Whether you're planning a road trip or running errands around town, this MPV delivers comfort, convenience, and style. Experience the Maxus MIFA 9 and discover a new level of practicality and functionality in a family vehicle`,
    qty: 6,
    price: 40000,
  },
  {
    id: 5,
    name: 'Citroen C3 Aircross',
    image:
      'https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2023/04/29174525/citroen-c3-aircross-tampak-depan.jpg',
    category: 'Citroen',
    description: `The Citroen C3 Aircross is a compact and stylish SUV that combines modern design with versatile functionality. With its sleek and eye-catching exterior, the C3 Aircross makes a bold statement on the road, while its compact size makes it ideal for navigating through urban environments with ease. Inside, you'll find a well-appointed cabin with comfortable seating and advanced technology features. Whether you're tackling city streets or venturing off the beaten path, the Citroen C3 Aircross offers a balance of style, agility, and practicality to enhance your driving experience. Explore the cityscape or explore the great outdoors in this versatile and fashionable SUV.`,
    qty: 10,
    price: 25000,
  },
  {
    id: 6,
    name: 'SUV Daihatsu D66B',
    image:
      'https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2022/12/06145035/Perodua-Nexis-Photo.jpg',
    category: 'Daihatsu',
    description: `The SUV Daihatsu D66B offers a perfect blend of comfort and performance, designed to cater to the needs of drivers who seek both a smooth ride and exhilarating driving dynamics. With its spacious and well-appointed interior, the D66B ensures that every journey is a comfortable and enjoyable experience. Whether you're commuting through the city or embarking on a long-distance road trip, the D66B provides a cozy and inviting cabin that makes you feel right at home.

    Under the hood, this SUV boasts a powerful engine and a responsive suspension system, delivering impressive performance on various terrains. The D66B's sporty and agile handling ensures that it can tackle winding roads and rough paths with ease. It's not just about getting from point A to point B; it's about the thrill of the journey.`,
    qty: 7,
    price: 30000,
  },
  {
    id: 7,
    name: 'Hyundai Ioniq 6',
    image:
      'https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2022/12/29175609/hyundai-ioniq-6-semakin-dekat-indonesia.jpg',
    category: 'Hyundai',
    description: `The Hyundai Ioniq 6 represents the next generation of electric sedans, where cutting-edge technology and sustainability converge in a harmonious automotive experience. This futuristic sedan boasts a sleek and aerodynamic design that not only catches the eye but also serves a functional purpose by enhancing efficiency. Under its stylish exterior, the Ioniq 6 is powered by a state-of-the-art electric motor, delivering impressive performance while emitting zero emissions. This means you can enjoy the thrill of driving without compromising the environment, making it a compelling choice for eco-conscious individuals and those seeking a taste of the automotive future.

    Inside, the Ioniq 6 offers a premium and tech-infused cabin, where drivers and passengers can relish in a connected, comfortable, and sustainable journey. Equipped with the latest in-car technology, including a cutting-edge infotainment system and advanced driver-assistance features, this sedan exemplifies Hyundai's commitment to a greener and smarter future. Whether you're commuting through the city or embarking on a long journey, the Hyundai Ioniq 6 promises an electrifying experience that harmoniously integrates sustainability, innovation, and style.`,
    qty: 4,
    price: 40000,
  },
  {
    id: 8,
    name: 'Hyundai Stargazer X',
    image:
      'https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2023/06/23094805/pemesanan-stargazer-cross.jpg',
    category: 'Hyundai',
    description: `The Hyundai Stargazer X is a groundbreaking masterpiece that introduces a new era of automotive design. Its unique and captivating design language marries form and function, making a bold statement that dares to challenge convention. From its sleek and futuristic exterior to the meticulously crafted interior, every aspect of the Stargazer X exudes a sense of artistry and innovation. This vehicle represents the pinnacle of Hyundai's design philosophy, pushing the boundaries of what's possible in the world of automobiles.

    Beneath its eye-catching exterior, the Stargazer X combines design with engineering excellence. The result is not just a visually stunning car but a high-performance and aerodynamic marvel. This harmonious fusion of aesthetics and functionality sets a new standard for the automotive industry, where style and substance coexist seamlessly. With the Hyundai Stargazer X, you're not just driving a car; you're experiencing a mobile work of art, redefining what a vehicle can be`,
    qty: 2,
    price: 35000,
  },
  {
    id: 9,
    name: 'Chery Tiggo 4 Pro',
    image:
      'https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2023/06/15104408/chery-tiggo-4-pro-comfort-vs-premium.jpg',
    category: 'Chery',
    description: `The Chery Tiggo 4 Pro takes the concept of comfort and style to new heights. This exceptional vehicle is designed to provide an unrivaled driving experience, where luxury and aesthetics blend seamlessly. Whether you're navigating city streets or embarking on a long journey, the Tiggo 4 Pro ensures you do so in absolute comfort and with undeniable panache. Its interior boasts a meticulously designed cabin with premium materials, offering a refined ambiance that pampers both driver and passengers.

    But the Tiggo 4 Pro doesn't just prioritize comfort; it also exudes style from every angle. With its contemporary and eye-catching design, this vehicle demands attention wherever it goes. From the sleek lines of its exterior to the thoughtfully appointed interior details, the Tiggo 4 Pro is a symbol of elegance and sophistication. Chery has seamlessly blended performance, luxury, and aesthetics to create a vehicle that's not just a means of transportation but an expression of individuality and style`,
    qty: 6,
    price: 30000,
  },
  {
    id: 10,
    name: 'Suzuki Jimny 5 Pintu',
    image:
      'https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2023/01/13155104/eksterior-suzuki-jimny-5-pintu.jpg',
    category: 'Suzuki',
    description:
      `The Suzuki Jimny 5 Pintu expands upon the legacy of its predecessors, elevating the rugged charm of the Jimny series to new heights. This compact SUV stands as a testament to Suzuki's commitment to both off-road enthusiasts and urban adventurers. With its distinctive design and practicality, the Jimny 5 Pintu offers a versatile driving experience that effortlessly transitions from city streets to rugged terrains. Its iconic boxy silhouette is not just for show; it's a testament to the vehicle's off-road capability and durability, making it a go-to choice for those seeking adventures off the beaten path."

     "The Suzuki Jimny 5 Pintu combines style and substance, striking a harmonious balance between urban chic and outdoor prowess. It's designed to meet the demands of both daily commutes and weekend getaways. Inside, the cabin is thoughtfully designed with modern amenities and comfort features, ensuring that every journey is as enjoyable as it is practical. Whether you're navigating busy urban streets, cruising down the highway, or tackling challenging off-road trails, the Jimny 5 Pintu is a versatile companion that's ready for any adventure. This compact SUV not only retains the Jimny's legendary off-road capabilities but also adds a touch of sophistication and practicality to the mix, making it a well-rounded vehicle for a variety of lifestyles.`,
    qty: 9,
    price: 25000,
  },
  {
    id: 11,
    name: 'Nissan X-Trail e-Power / X-Trail T33',
    image:
      'https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2022/07/21013814/Nissan-X-Trail-G-e-4ORCE.jpg',
    category: 'Nissan',
    description: `The Nissan X-Trail e-Power redefines the SUV landscape with its innovative hybrid technology, setting new standards for efficiency and environmental sustainability. As a pioneering hybrid SUV, the X-Trail e-Power combines a gasoline engine with electric power to deliver a seamless and eco-friendly driving experience. This unique powertrain not only reduces fuel consumption but also minimizes emissions, making it a compelling choice for those who prioritize environmental responsibility. With the X-Trail e-Power, Nissan showcases its commitment to a greener and more sustainable future in the world of automobiles."

    "In addition to its eco-friendly attributes, the Nissan X-Trail e-Power excels in delivering a comfortable and versatile driving experience. Its interior is designed with modern amenities, spaciousness, and a focus on passenger comfort, ensuring that every journey is a pleasant one. The X-Trail e-Power offers a versatile SUV that seamlessly transitions from city streets to highways while maintaining excellent fuel efficiency. With advanced features and a forward-looking design, this hybrid SUV represents a new era of automotive innovation, where efficiency and environmental consciousness go hand in hand with style and practicality.`,
    qty: 5,
    price: 35000,
  },
  {
    id: 12,
    name: 'Suzuki XL7 Hybrid',
    image:
      'https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2023/06/15161224/image-3-4.png',
    category: 'Suzuki',
    description: `The Suzuki XL7 Hybrid is not just a family-friendly SUV; it's a remarkable testament to Suzuki's commitment to providing a well-rounded and sustainable driving experience for families. This innovative hybrid SUV combines the spaciousness and versatility that families need with an environmentally responsible approach. Its hybrid powertrain not only reduces emissions but also offers outstanding fuel efficiency, making it an eco-conscious choice for family adventures. With the XL7 Hybrid, Suzuki strikes a harmonious balance between functionality and sustainability, showcasing that family vehicles can be both practical and eco-friendly."

    "Inside the Suzuki XL7 Hybrid, you'll discover a thoughtfully designed cabin that prioritizes family comfort and convenience. With spacious seating, ample cargo space, and a range of family-friendly features, the XL7 Hybrid is the ideal companion for everyday errands and family trips. Its stylish and modern exterior design complements the SUV's practicality, making a statement on the road. Whether you're carpooling, going on a road trip, or simply enjoying daily commutes, the XL7 Hybrid offers a family-oriented vehicle that upholds Suzuki's legacy of providing reliable, safe, and environmentally conscious options for families on the go.` ,
    qty: 7,
    price: 40000,
  },
  {
    id: 13,
    name: 'Toyota Yaris Cross',
    image:
      'https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2023/05/13145626/harga-yarris-cross-2023-tampak-depan-1.jpg',
    category: 'Toyota',
    description: 'The Toyota Yaris Cross is a compact crossover SUV.',
    qty: 4,
    price: 30000,
  },
  {
    id: 14,
    name: 'Mazda CX-60 Hybrid',
    image:
      'https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2022/11/28150829/mazda-cx-60-2022.jpg',
    category: 'Mazda',
    description: 'The Mazda CX-60 Hybrid offers a premium driving experience.',
    qty: 3,
    price: 35000,
  },
]

export default carsData
