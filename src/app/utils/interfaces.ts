export interface Coordinates {
    latitude: string;
    longitude: string;
  }
  
export interface Timezone {
    offset: string;
    description: string;
  }
  
export interface Street {
    number: number;
    name: string;
  }
  
  export  interface Location {
    street: Street;
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: Coordinates;
    timezone: Timezone;
  }
  
  export  interface Name {
    title: string;
    first: string;
    last: string;
  }
  
  export  interface Dob {
    date: string;
    age: number;
  }
  
  export  interface Registered {
    date: string;
    age: number;
  }
  
  export interface Id {
    name: string;
    value: string;
  }
  
  export  interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
  }
  
  export interface Result {
    gender: string;
    name: Name;
    location: Location;
    email: string;
    login: {
      uuid: string;
      username: string;
      password: string;
      salt: string;
      md5: string;
      sha1: string;
      sha256: string;
    };
    dob: Dob;
    registered: Registered;
    phone: string;
    cell: string;
    id: Id;
    picture: Picture;
    nat: string;
  }
  
  export interface Info {
    seed: string;
    results: number;
    page: number;
    version: string;
  }
  
  export interface ApiResponseProfile {
    results: Result[];
    info: Info;
  }
  

  export interface ApiResponseGetRestaurant {
    id: number;
    name: string;
    address1: string;
    address2: string;
    latitude: number;
    longitude: number;
  }

  export interface PizzaProds {
    id: number;
    category: string;
    name: string;
    image: string;
    topping: string[];
    price: number;
    rank: number;
  }

  export interface Employee {
    id: number;
    employee_name: string;
    employee_salary: number;
    employee_age: number;
    profile_image: string;
  }
  
  export interface ApiResponseEmployees {
    status: string;
    data: Employee[];
    message: string;
  }

  export interface ApiResponseFruit {
    name: string;
    id: number;
    family: string;
    order: string;
    genus: string;
    nutritions: {
      calories: number;
      fat: number;
      sugar: number;
      carbohydrates: number;
      protein: number;
    };
  }