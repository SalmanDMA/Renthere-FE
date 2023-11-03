import { linkBikes, linkCars, linkContact, linkRenthere, linkHome, linkServices, linkTestimonials } from "./linkData.js";

const navigationData = [
  {
    text: 'Home',
    to: linkHome,
  },
  {
    text: 'Cars',
    to: linkCars,
  },
  {
    text: 'Bikes',
    to: linkBikes,
  },
  {
    text: 'Renthere',
    to: linkRenthere,
  },
  {
    text: 'Services',
    to: linkServices,
  },
  {
    text: 'Testimonials',
    to: linkTestimonials,
  },
  {
    text: 'Contact',
    to: linkContact,
  },
];

export default navigationData;
