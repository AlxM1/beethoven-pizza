import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[$+]/g, ""));
}

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("changeme123", 12);
  await prisma.user.upsert({
    where: { email: "admin@beethovenspizza.com" },
    update: {},
    create: {
      email: "admin@beethovenspizza.com",
      passwordHash: adminPassword,
      name: "Admin",
      role: "admin",
    },
  });
  console.log("Created admin user");

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "pizza" },
      update: {},
      create: { name: "Pizza Classics", slug: "pizza", displayOrder: 1 },
    }),
    prisma.category.upsert({
      where: { slug: "submarines" },
      update: {},
      create: { name: "Oven-Baked Submarines", slug: "submarines", displayOrder: 2 },
    }),
    prisma.category.upsert({
      where: { slug: "appetizers" },
      update: {},
      create: { name: "Appetizers", slug: "appetizers", displayOrder: 3 },
    }),
    prisma.category.upsert({
      where: { slug: "salads" },
      update: {},
      create: { name: "Salads", slug: "salads", displayOrder: 4 },
    }),
    prisma.category.upsert({
      where: { slug: "pasta" },
      update: {},
      create: { name: "Pasta", slug: "pasta", displayOrder: 5 },
    }),
    prisma.category.upsert({
      where: { slug: "combo-dinners" },
      update: {},
      create: { name: "Combo Dinners", slug: "combo-dinners", displayOrder: 6 },
    }),
    prisma.category.upsert({
      where: { slug: "beverages" },
      update: {},
      create: { name: "Beverages", slug: "beverages", displayOrder: 7 },
    }),
    prisma.category.upsert({
      where: { slug: "extras" },
      update: {},
      create: { name: "Extras", slug: "extras", displayOrder: 8 },
    }),
  ]);
  console.log("Created categories");

  const [pizza, submarines, appetizers, salads, pasta, comboDinners, beverages, extras] = categories;

  // Seed pizzas
  const pizzas = [
    { name: "Cheese Pizza", description: "Our signature thick crust with premium mozzarella cheese", priceSmall: 17, priceMedium: 22, priceLarge: 27 },
    { name: "Pepperoni", description: "Classic cup-and-char pepperoni with mozzarella", priceSmall: 19, priceMedium: 24, priceLarge: 29, isPopular: true },
    { name: "Ham & Pineapple", description: "Sweet pineapple and savory ham - the classic Hawaiian combination", priceSmall: 19, priceMedium: 24, priceLarge: 29 },
    { name: "Hawaiian", description: "Ham, Pineapple, Green Peppers", priceSmall: 20, priceMedium: 25, priceLarge: 30 },
    { name: "Canadian", description: "Pepperoni, Ham, Mushrooms, Bacon", priceSmall: 21, priceMedium: 26, priceLarge: 31 },
    { name: "New Yorker", description: "Italian Sausage, Tomatoes, Green Peppers, Onions, Fresh Garlic", priceSmall: 21, priceMedium: 26, priceLarge: 31 },
    { name: "Vegetarian", description: "Black Olives, Tomatoes, Green Peppers, Onions, Mushrooms", priceSmall: 21, priceMedium: 26, priceLarge: 31, isVegetarian: true },
    { name: "Athenian", description: "Spinach, Black Olives, Tomatoes, Green Peppers, Onions, Feta Cheese", priceSmall: 21, priceMedium: 26, priceLarge: 31, isVegetarian: true },
    { name: "Greek", description: "Spinach, Black Olives, Tomatoes, Green Peppers, Onions, Feta Cheese", priceSmall: 21, priceMedium: 26, priceLarge: 31, isVegetarian: true },
    { name: "Spinach & Feta", description: "Fresh Spinach, Feta Cheese, Garlic, Tomatoes", priceSmall: 21, priceMedium: 26, priceLarge: 31, isVegetarian: true },
    { name: "Meat Lovers", description: "Pepperoni, Ham, Italian Sausage, Bacon, Ground Beef", priceSmall: 22, priceMedium: 28, priceLarge: 33, isPopular: true },
    { name: "Chicken Pizza", description: "Grilled Chicken, Tomatoes, Green Peppers, Onions", priceSmall: 22, priceMedium: 28, priceLarge: 33 },
    { name: "Shrimp Pizza", description: "Shrimp, Tomatoes, Green Peppers, Onions, Fresh Garlic", priceSmall: 23, priceMedium: 29, priceLarge: 34, isPremium: true },
    { name: "BBQ Pork Ribs Pizza", description: "Boneless BBQ Pork Ribs, Onions, Green Peppers, Tomatoes", priceSmall: 22, priceMedium: 28, priceLarge: 33 },
    { name: "Beethoven's Special", description: "Salami, Ham, Onions, Green Peppers, Mushrooms, Tomatoes, Pineapple", priceSmall: 22, priceMedium: 28, priceLarge: 33, isSignature: true, isPopular: true, imageUrl: "/images/Beethoven's Special.JPEG" },
    { name: "Najib's Special", description: "Beef, Pepperoni, Salami, Ham with Fresh Tomatoes & Feta Cheese added after baking", priceSmall: 23, priceMedium: 29, priceLarge: 34, isSignature: true, isPremium: true },
  ];

  for (let i = 0; i < pizzas.length; i++) {
    const p = pizzas[i];
    await prisma.menuItem.upsert({
      where: { slug: slugify(p.name) },
      update: {},
      create: {
        name: p.name,
        slug: slugify(p.name),
        description: p.description,
        categoryId: pizza.id,
        priceSmall: p.priceSmall,
        priceMedium: p.priceMedium,
        priceLarge: p.priceLarge,
        isSignature: p.isSignature || false,
        isPopular: p.isPopular || false,
        isPremium: p.isPremium || false,
        isVegetarian: p.isVegetarian || false,
        imageUrl: p.imageUrl || null,
        displayOrder: i + 1,
      },
    });
  }
  console.log("Created pizzas");

  // Seed toppings
  const regularToppings = ["Pepperoni", "Ham", "Salami", "Italian Sausage", "Bacon", "Ground Beef", "Mushrooms", "Onions", "Green Peppers", "Black Olives", "Tomatoes", "Pineapple", "Jalapeños"];
  const gourmetToppings = ["Shrimp", "Grilled Chicken", "Feta Cheese", "Sun-Dried Tomatoes", "Artichoke Hearts", "Roasted Garlic", "Spinach", "Anchovies", "BBQ Pork Ribs"];

  for (let i = 0; i < regularToppings.length; i++) {
    await prisma.topping.upsert({
      where: { name: regularToppings[i] },
      update: {},
      create: {
        name: regularToppings[i],
        type: "regular",
        priceSmall: 2.5,
        priceMedium: 3.0,
        priceLarge: 3.5,
        displayOrder: i + 1,
      },
    });
  }

  for (let i = 0; i < gourmetToppings.length; i++) {
    await prisma.topping.upsert({
      where: { name: gourmetToppings[i] },
      update: {},
      create: {
        name: gourmetToppings[i],
        type: "gourmet",
        priceSmall: 3.5,
        priceMedium: 4.0,
        priceLarge: 4.5,
        displayOrder: i + 100,
      },
    });
  }

  await prisma.topping.upsert({
    where: { name: "Extra Mozzarella" },
    update: {},
    create: {
      name: "Extra Mozzarella",
      type: "cheese",
      priceSmall: 3.0,
      priceMedium: 4.0,
      priceLarge: 5.0,
      displayOrder: 200,
    },
  });
  console.log("Created toppings");

  // Seed submarines
  const subs = [
    { name: "Meatball Sub", description: "Homemade meatballs with marinara sauce and melted mozzarella", price: 12 },
    { name: "Italian Sub", description: "Ham, Salami, Pepperoni with lettuce, tomatoes, onions and Italian dressing", price: 12 },
    { name: "Chicken Parmesan Sub", description: "Breaded chicken breast with marinara sauce and melted mozzarella", price: 13 },
    { name: "Veggie Sub", description: "Mushrooms, green peppers, onions, tomatoes, black olives with mozzarella", price: 11, isVegetarian: true },
    { name: "Steak Sub", description: "Sliced steak with mushrooms, onions, green peppers and mozzarella", price: 14 },
  ];

  for (let i = 0; i < subs.length; i++) {
    const s = subs[i];
    await prisma.menuItem.upsert({
      where: { slug: slugify(s.name) },
      update: {},
      create: {
        name: s.name,
        slug: slugify(s.name),
        description: s.description,
        categoryId: submarines.id,
        price: s.price,
        isVegetarian: s.isVegetarian || false,
        displayOrder: i + 1,
      },
    });
  }
  console.log("Created submarines");

  // Seed appetizers
  const apps = [
    { name: "Spanakopita", description: "8 crispy phyllo triangles stuffed with spinach & feta", price: 14, isVegetarian: true },
    { name: "Garlic Bread", description: "Fresh baked with garlic butter", price: 5, isVegetarian: true },
    { name: "Garlic Cheese Bread", description: "Topped with melted mozzarella", price: 9, isVegetarian: true },
    { name: "Chicken Wings", description: "6 pieces - Hot or Honey Garlic", price: 9 },
    { name: "Dry Garlic Ribs", description: "8 oz of crispy, flavorful ribs", price: 9 },
  ];

  for (let i = 0; i < apps.length; i++) {
    const a = apps[i];
    await prisma.menuItem.upsert({
      where: { slug: slugify(a.name) },
      update: {},
      create: {
        name: a.name,
        slug: slugify(a.name),
        description: a.description,
        categoryId: appetizers.id,
        price: a.price,
        isVegetarian: a.isVegetarian || false,
        displayOrder: i + 1,
      },
    });
  }
  console.log("Created appetizers");

  // Seed salads
  const saladsData = [
    { name: "Greek Salad", description: "Cucumber, Tomatoes, Onions, Kalamata Olives, Feta Cheese", priceSmall: 8, priceLarge: 15, isVegetarian: true },
    { name: "Caesar Salad", description: "Crisp Romaine, Parmesan, Croutons, House-made Caesar Dressing", priceSmall: 7, priceLarge: 13, isVegetarian: true },
  ];

  for (let i = 0; i < saladsData.length; i++) {
    const s = saladsData[i];
    await prisma.menuItem.upsert({
      where: { slug: slugify(s.name) },
      update: {},
      create: {
        name: s.name,
        slug: slugify(s.name),
        description: s.description,
        categoryId: salads.id,
        priceSmall: s.priceSmall,
        priceLarge: s.priceLarge,
        isVegetarian: s.isVegetarian || false,
        displayOrder: i + 1,
      },
    });
  }
  console.log("Created salads");

  // Seed pasta
  const pastaData = [
    { name: "Baked Lasagna", description: "Rich layers of pasta, savory meat sauce, and creamy cheese, baked to golden perfection", price: 17 },
    { name: "Spinach & Cheese Cannelloni", description: "Delicate pasta tubes filled with spinach and ricotta, topped with marinara sauce", price: 17, isVegetarian: true },
    { name: "Spaghetti alla Bolognese", description: "Classic spaghetti topped with our tasty slow-cooked meat sauce", price: 14 },
    { name: "Spaghetti with Meatballs", description: "Spaghetti with homemade meatballs in marinara sauce", price: 16 },
    { name: "Fettuccine Alfredo", description: "Fettuccine in a creamy parmesan alfredo sauce", price: 15, isVegetarian: true },
    { name: "Chicken Fettuccine Alfredo", description: "Fettuccine alfredo with grilled chicken breast", price: 18 },
    { name: "Kids Spaghetti", description: "Smaller portion of spaghetti with meat sauce or butter", price: 8 },
  ];

  for (let i = 0; i < pastaData.length; i++) {
    const p = pastaData[i];
    await prisma.menuItem.upsert({
      where: { slug: slugify(p.name) },
      update: {},
      create: {
        name: p.name,
        slug: slugify(p.name),
        description: p.description,
        categoryId: pasta.id,
        price: p.price,
        isVegetarian: p.isVegetarian || false,
        displayOrder: i + 1,
      },
    });
  }
  console.log("Created pasta");

  // Seed combo dinners
  const combosData = [
    { name: "Lasagna Combo", description: "Baked Lasagna + Caesar or Greek Salad + Garlic Bread", price: 22 },
    { name: "Cannelloni Combo", description: "Spinach & Cheese Cannelloni + Caesar or Greek Salad + Garlic Bread", price: 22 },
    { name: "Spaghetti Combo", description: "Spaghetti alla Bolognese + Caesar or Greek Salad + Garlic Bread", price: 19 },
    { name: "Wings Combo", description: "Chicken Wings (6) + Caesar or Greek Salad + Garlic Bread", price: 18 },
  ];

  for (let i = 0; i < combosData.length; i++) {
    const c = combosData[i];
    await prisma.menuItem.upsert({
      where: { slug: slugify(c.name) },
      update: {},
      create: {
        name: c.name,
        slug: slugify(c.name),
        description: c.description,
        categoryId: comboDinners.id,
        price: c.price,
        displayOrder: i + 1,
      },
    });
  }
  console.log("Created combo dinners");

  // Seed beverages
  const beveragesData = [
    { name: "Soft Drinks", price: 3 },
    { name: "Juice", price: 3.5 },
    { name: "Coffee/Tea", price: 3 },
  ];

  for (let i = 0; i < beveragesData.length; i++) {
    const b = beveragesData[i];
    await prisma.menuItem.upsert({
      where: { slug: slugify(b.name) },
      update: {},
      create: {
        name: b.name,
        slug: slugify(b.name),
        categoryId: beverages.id,
        price: b.price,
        displayOrder: i + 1,
      },
    });
  }
  console.log("Created beverages");

  // Seed extras
  const extrasData = [
    { name: "Gluten-Free Pizza", description: "Available in Medium size only", price: 4, isGlutenFree: true },
    { name: "Extra Dipping Sauce", price: 1 },
    { name: "Add Shrimp to Salad", price: 6 },
    { name: "Extra Dressing", description: "Ranch, Creamy Garlic, or Cheddar", price: 1.5 },
  ];

  for (let i = 0; i < extrasData.length; i++) {
    const e = extrasData[i];
    await prisma.menuItem.upsert({
      where: { slug: slugify(e.name) },
      update: {},
      create: {
        name: e.name,
        slug: slugify(e.name),
        description: e.description || null,
        categoryId: extras.id,
        price: e.price,
        isGlutenFree: e.isGlutenFree || false,
        displayOrder: i + 1,
      },
    });
  }
  console.log("Created extras");

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
