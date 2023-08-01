import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { ProductCartService } from 'src/app/shared/services/product-cart.service';
import { MenuItem } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-make-your-pizza',
  templateUrl: './make-your-pizza.component.html',
  styleUrls: ['./make-your-pizza.component.css']
})
export class MakeYourPizzaComponent implements OnInit {

  @ViewChild('doneList', { read: ElementRef }) doneListRef: ElementRef | undefined;
  @ViewChild('stepper') stepper!: MatStepper;

  todo = [
    {
      title: 'Basil',
      small: '../../../assets/pizza-maker/Basil.png',
      large: '../../../assets/pizza-maker/lots_basil.png',
      price: 3

    },
    {
      title: 'Corn',
      small: '../../../assets/pizza-maker/Corn.png',
      large: '../../../assets/pizza-maker/lots_corn.png',
      price: 3

    },
    {
      title: 'Olives',
      small: '../../../assets/pizza-maker/green_olives.png',
      large: '../../../assets/pizza-maker/lots_olives.png',
      price: 3

    },
    {
      title: 'Ham',
      small: '../../../assets/pizza-maker/Ham.png',
      large: '../../../assets/pizza-maker/lots_ham.png',
      price: 3

    },
    {
      title: 'Green Pepper',
      small: '../../../assets/pizza-maker/Pepper.png',
      large: '../../../assets/pizza-maker/lots_greepeper.png',
      price: 3

    },
    {
      title: 'Pepperoni',
      small: '../../../assets/pizza-maker/Pepperoni.png',
      large: '../../../assets/pizza-maker/lots_peperoni.png',
      price: 3

    },
    {
      title: 'Mushroom',
      small: '../../../assets/pizza-maker/Mushroom.png',
      large: '../../../assets/pizza-maker/lots_mushrooms.png',
      price: 3

    },
    {
      title: 'Onion',
      small: '../../../assets/pizza-maker/Onion.png',
      large: '../../../assets/pizza-maker/lots_onion.png',
      price: 3

    },
    {
      title: 'Pineapple',
      small: '../../../assets/pizza-maker/Pineapple.png',
      large: '../../../assets/pizza-maker/lots_pineapple.png',
      price: 3

    },
    {
      title: 'Red Pepper',
      small: '../../../assets/pizza-maker/red_peper.png',
      large: '../../../assets/pizza-maker/lots_redpeper.png',
      price: 3

    },
    {
      title: 'Tomato',
      small: '../../../assets/pizza-maker/Tomato.png',
      large: '../../../assets/pizza-maker/lots_tomatoes.png',
      price: 3

    }
  ];
  environment = [
    { label: 'Appetizer', content: '' },
    { label: 'Drinks', content: '' },
    { label: 'Desserts', content: '' },
    { label: 'Finish', content: '' }
  ];


  appetizer: MenuItem[] = [
    { label: 'Cheese sticks', price: 5 },
    { label: 'Garlic Bread', price: 5 },
    { label: 'Potatoes Wedges', price: 5 },
    { label: 'Nothing', price: 0 },
  ];

  drinks: MenuItem[] = [
    { label: 'Coca-cola', price: 5 },
    { label: '7Up', price: 5 },
    { label: 'Pepsi', price: 5 },
    { label: 'Nothing', price: 0 },
  ];

  desserts: MenuItem[] = [
    { label: 'Cheesecake', price: 5 },
    { label: 'Apple Pie', price: 5 },
    { label: 'Brownie', price: 5 },
    { label: 'Nothing', price: 0 },
  ];
  done = new Array<any>();
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  environmentForm: FormGroup[] = [];
  radioChanged: boolean = false;
  showPressHold: boolean = true;
  showSwipeHorizontal: boolean = false;
  constructor(private _formBuilder: FormBuilder, private productCartService: ProductCartService, private cdRef: ChangeDetectorRef) {
   
  }
  ngOnInit(): void {
    this.toggleSVGs();

    this.firstFormGroup = this._formBuilder.group({
      content: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      content: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      content: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      content: ['', Validators.required]
    });
    this.createFormGroups();

  }

  createFormGroups() {
    // Create form groups for each step with the content field
    this.environmentForm = this.environment.map(env =>
      this._formBuilder.group({
        content: [env.content, Validators.required]
      })
    );
  }
 
goForward(stepper: MatStepper) {
  const currentStepIndex = stepper.selectedIndex;
  const currentStep = stepper.steps.toArray()[currentStepIndex] as MatStep;

  // If the step is not already marked as completed, mark it as completed
  if (!currentStep.completed) {
    currentStep.completed = true;
  }
  this.cdRef.detectChanges(); 
  
  stepper.next();
}
toggleSVGs() {
  setTimeout(() => {
    this.showPressHold = false;
    this.showSwipeHorizontal = true;

    setTimeout(() => {
      this.showSwipeHorizontal = false;
    }, 3000); 
  }, 4000); 
}
  getStepFormGroup(envIndex: number): FormGroup {
    return this.environmentForm[envIndex];
  }
  drop(event: CdkDragDrop<string[]> | any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Instead of using transferArrayItem, we'll clone and add the item to the "done" list
      this.cloneAndAddToDone(event.previousContainer.data[event.previousIndex], event.currentIndex);
    }
  }
  isItemInDone(item: any): boolean {
    // Replace 'title' with the property that uniquely identifies an item in your object
    return this.done.some((doneItem:any) => doneItem.title === item.title);
  }
  cloneAndAddToDone(item: any, index: number) {
    // Clone the item using an appropriate method (deep copy) based on your object's structure.
    // For example, you can use Object.assign({}, item) or a custom deep cloning function.
    const clonedItem = { ...item }; // Shallow clone
  
    // Add the cloned item to the "done" array at the specified index.
    this.done.splice(index, 0, clonedItem);
    
  }
  finish(): void {
    // Send the form data one by one to the productCartService
    this.environmentForm.forEach((formGroup, index) => {
      const formData = this.getFormDataWithoutCircularRefs([formGroup]);
      if(formData)
      this.productCartService.addProductToCart(formData[0]); // Assuming your productCartService.addProductToCart() expects a single product as an argument.
    });
    const customPizzaBasePrice = 20;
    const totalPrice = this.done.reduce((acc, topping) => acc + topping.price, customPizzaBasePrice);

    const customPizza: any = {
      name: 'Custom Pizza',
      price: totalPrice,
    };
    this.productCartService.addProductToCart(customPizza); 
    // Reset the form
    this.stepper.reset();
  }
  isLastStep(stepIndex: number): boolean {
    return stepIndex === this.environment.length - 1;
  }
  getItemsByStep(stepLabel: string): MenuItem[] {
    switch (stepLabel) {
      case 'Appetizer':
        return this.appetizer;
      case 'Drinks':
        return this.drinks;
      case 'Desserts':
        return this.desserts;
      default:
        return [];
    }
  }
  getFormDataWithoutCircularRefs(formGroups: FormGroup[]): any {
    const formData: any[] = [];
    for (const formGroup of formGroups) {
      const contentControl = formGroup.get('content');
      if (contentControl?.value !== null && contentControl?.value.trim() !== '') { // Check if content is not null and not an empty string
        const formGroupData: any = {};
        Object.keys(formGroup.controls).forEach(controlName => {
          const control = formGroup.get(controlName);
          if (controlName === 'content') {
            const contentValue = control?.value;
            formGroupData['name'] = contentValue;
            formGroupData['price'] = this.getPriceByContent(contentValue);
          } else {
            formGroupData[controlName] = control instanceof FormControl ? control.value : control?.value.content;
          }
        });
        formGroupData['id'] = this.generateRandomId();
        formData.push(formGroupData);
      }
    }

    // Remove null entries from formData
    const filteredFormData = formData.filter(data => data !== null);
    if(filteredFormData.length === 0)return
    return filteredFormData;
  }

  getPriceByContent(content: string): number {
    const item = [...this.appetizer, ...this.drinks, ...this.desserts].find(item => item.label === content);
    return item ? item.price : 0;
  }
  getFormControl(envIndex: number, controlName: string): FormControl {
    const control = this.environmentForm[envIndex].get(controlName);
    return control instanceof FormControl ? control : new FormControl('');
  }
  generateRandomId(): string {
    return Math.random().toString(36).substring(2);
  }
  removeFromArray(titleToRemove: string): void {
    const indexToRemove = this.done.findIndex(item => item.title === titleToRemove);
    if (indexToRemove !== -1) {
      this.done.splice(indexToRemove, 1);
    }
  }
  isInArray(title: string): boolean {
    
    for (const item of this.done) {
      if (item.title === title) {
        return true;
      }
    }
    return false;
  }
  onDragStart() {
    if (this.doneListRef) {
      this.doneListRef.nativeElement.classList.add('blink-animation');
    }
  }
  
  onDragEnd() {
    if (this.doneListRef) {
      this.doneListRef.nativeElement.classList.remove('blink-animation');
    }
  }

  doneDrop(event: CdkDragDrop<string[]> | any) {
    if (event.previousContainer !== event.container) {
      // Remove item from "done" array when dragged to "removeList"
      const itemToRemove = event.previousContainer.data[event.previousIndex];
      this.done = this.done.filter((item) => item !== itemToRemove);
    }
  }
}
