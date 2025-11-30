import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Sochi Roast',
      brand: 'Some brand',
      flavors: ['raspberry'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: number) {
    const coffee = this.coffees.find((c) => c.id === id);
    if (!coffee) {
      throw new NotFoundException(`Coffee ${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const newCoffee = {
      id: this.coffees.length + 1,
      ...createCoffeeDto,
    };
    this.coffees.push(newCoffee);
    console.log(createCoffeeDto instanceof CreateCoffeeDto);
    return createCoffeeDto;
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = this.findOne(id);
    if (coffee) {
      Object.assign(coffee, updateCoffeeDto);
    }
    return coffee;
  }

  delete(id: number) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    return this.coffees.splice(coffeeIndex, 1);
  }
}
