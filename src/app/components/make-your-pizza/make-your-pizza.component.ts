import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-make-your-pizza',
  templateUrl: './make-your-pizza.component.html',
  styleUrls: ['./make-your-pizza.component.css']
})
export class MakeYourPizzaComponent {

  @ViewChild('doneList', { read: ElementRef }) doneListRef: ElementRef | undefined;

  todo = [
    {
      title: 'Basil',
      small: '../../../assets/pizza-maker/Basil.png',
      large: '../../../assets/pizza-maker/lots_basil.png',

    },
    {
      title: 'Corn',
      small: '../../../assets/pizza-maker/Corn.png',
      large: '../../../assets/pizza-maker/lots_corn.png',

    },
    {
      title: 'Olives',
      small: '../../../assets/pizza-maker/green_olives.png',
      large: '../../../assets/pizza-maker/lots_olives.png',

    },
    {
      title: 'Ham',
      small: '../../../assets/pizza-maker/Ham.png',
      large: '../../../assets/pizza-maker/lots_ham.png',

    },
    {
      title: 'Green Pepper',
      small: '../../../assets/pizza-maker/Pepper.png',
      large: '../../../assets/pizza-maker/lots_greepeper.png',

    },
    {
      title: 'Pepperoni',
      small: '../../../assets/pizza-maker/Pepperoni.png',
      large: '../../../assets/pizza-maker/lots_peperoni.png',

    },
    {
      title: 'Mushroom',
      small: '../../../assets/pizza-maker/Mushroom.png',
      large: '../../../assets/pizza-maker/lots_mushrooms.png',

    },
    {
      title: 'Onion',
      small: '../../../assets/pizza-maker/Onion.png',
      large: '../../../assets/pizza-maker/lots_onion.png',

    },
    {
      title: 'Pineapple',
      small: '../../../assets/pizza-maker/Pineapple.png',
      large: '../../../assets/pizza-maker/lots_pineapple.png',

    },
    {
      title: 'Red Pepper',
      small: '../../../assets/pizza-maker/red_peper.png',
      large: '../../../assets/pizza-maker/lots_redpeper.png',

    },
    {
      title: 'Tomato',
      small: '../../../assets/pizza-maker/Tomato.png',
      large: '../../../assets/pizza-maker/lots_tomatoes.png',

    }
  ];

  done = new Array<any>();


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
