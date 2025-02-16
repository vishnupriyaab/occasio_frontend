export interface FoodData {
    foodName: string;
    category: "Vegetarian" | "Non-vegetarian";
    price: number;
    quantity?:number;
    foodSection: "Welcome Drink" | "Main Food" | "Dessert";
    status: "Available" | "Not Available";
    createdAt?: Date;
    updatedAt?: Date;
  }

  export interface foodResponse{
    statusCode:number;
    message: string;
    data: FoodData[]
  }