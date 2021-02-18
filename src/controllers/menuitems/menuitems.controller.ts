import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MenuItemmDTO } from 'src/models/menuitem.model';
import { MenuitemsService } from 'src/services/menuitems.service';

@Controller('menuitems')
export class MenuitemsController {

    constructor(private menuItemService: MenuitemsService) {}

    @Post()
    async addMenuItem(@Body() menuItem: MenuItemmDTO) {
        return await this.menuItemService.addMenuItem(menuItem);
    }

    @Post('/update/:menuItem')
    async updateMenuItem(@Body() menuItem: MenuItemmDTO, @Param('menuItem') menuItemId: string) {
        return await this.menuItemService.updateMenuItem(menuItemId, menuItem)
    }

    @Post('/sub')
    async addSubMenuItem(@Body() menuItem: MenuItemmDTO) {
        return await this.menuItemService.addSubMenuItem(menuItem);
    }

    @Delete()
    async deleteMenuItem(@Body() menuItem: {menuItemId: string}) {
        return await this.menuItemService.removeMenuItem(menuItem.menuItemId);
    }

    @Get('/sub') 
    async getSubMenuItems() {
        return await this.menuItemService.findSubUserMenuItems();
    }

    @Get('/user')
    async getUserMenuItems() {
        return await this.menuItemService.findUserMenuItems();
    }

    @Get('/doctor')
    async getDoctorMenuItems() {
        return await this.menuItemService.findDoctorMenuItems();
    }

}
