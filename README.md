# RentHere

RentHere is an easy-to-use website that facilitates vehicle rentals, including cars and motorcycles (for now), in the future there may be more vehicle options and multiple branches. In this website, there are two user roles: admin and user. The admin has full CRUD (create, read, update, delete) capabilities for the following:

- User Management
- Car Management
- Motorcycle Management
- Transaction Management
- Testimonial Management

On the other hand, registered users have the ability to create and edit transactions. However, the ability to delete transactions and proceed to payment is still under development. Visitors who are not logged in can still access certain pages on the RentHere website, such as viewing the list of available vehicles, services offered, testimonial page, contact page, and landing or home page. Access to the details and transaction pages is reserved for logged-in users only.

Don't hesitate any longer, visit the RentHere website and experience the convenience of renting a vehicle.

## Technologies Used

- Nuxt.js
- Axios for API communication
- Tailwind CSS for the user interface
- Express.js
- JWT (JSON Web Tokens)
- Sequelize and MySQL

## Notes

We apologize for the current bugs and missing features, such as testimonials, transactions, and the payment process, among others. Your feedback and suggestions are greatly appreciated in our efforts to enhance the quality of the RentHere website. Your support and ideas are invaluable for the development of RentHere. Thank you!

## How to Use

To use the RentHere website, follow these steps:

1. **Installation**: Clone the repository and navigate to the project folder:

   ```bash
   git clone <repository_url>
   cd RentHere
   ```

2. **Install Dependencies**: Install the required dependencies using NPM or Yarn:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configuration**: Set up your environment variables and database configurations as needed.

4. **Database Migration**: Run the database migrations to create the necessary tables:

   ```bash
   npx sequelize db:migrate
   ```

5. **Seeders Migration**: Run the seeders migrations to create the necessary colums:

   ```bash
   <localhost>/seeders
   ```

6. **Start the Application**: Launch the application locally:

   ```
   npm run dev
   ```

7. **Access the Application**: Open a web browser and go to [http://localhost:3000](http://localhost:3000) to start using RentHere.

8. **Login**: Create an account or log in as an existing user to explore the full range of features.

## BE Repo Link

[Renthere-BE](https://github.com/SalmanDMA/RentHere-BE)

<!-- ## Visit the Live Demo

Explore the live demo of RentHere: [RentHere Demo](https://your-demo-link.com) -->

## Contribute

We welcome contributions from the community! Please feel free to open issues, submit pull requests, or provide any feedback to help us improve the RentHere project.

---

© 2023. Developed by Salman Dwi Maulana Akbar.
