import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuItem } from 'src/entities/menuitem.entity';
import { MenuItemmDTO } from 'src/models/menuitem.model';
import { Repository } from 'typeorm';

@Injectable()
export class MenuitemsService {

    constructor(@InjectRepository(MenuItem) private menuItemRepo: Repository<MenuItem>) {}

    async addMenuItem(menuItem: MenuItemmDTO) {
        let menuItemEntity: MenuItem = await this.menuItemRepo.create(menuItem);
        await menuItemEntity.save();
        return menuItemEntity;
    }

    async addSubMenuItem(menuItem: MenuItemmDTO) {
        let menuItemEntity: MenuItem = await this.menuItemRepo.create(menuItem);
        await menuItemEntity.save();
        return menuItemEntity;
    }

    async removeMenuItem(menuItemId: string) {
        let menuItem = await this.menuItemRepo.findOne({where: {id: menuItemId}});
        await menuItem.remove();
        return {
            menuItem
        }
    }

    async updateMenuItem(menuItemId: string, menuItemUpdate: MenuItemmDTO) {
        let menuItem = await this.menuItemRepo.update({id: +menuItemId}, menuItemUpdate);
        return {menuItem};
    }

    async findSubUserMenuItems() {
        let menuItems = await this.menuItemRepo.find({where: {isSub: true}});
        return {
            menuArray: menuItems
        }
    }

    async findUserMenuItems() {
        let menuItems = await this.menuItemRepo.find({where: {isUser: true}});
        return {
            menuArray: menuItems
        }
    }

    async findDoctorMenuItems() {
        let menuItems = await this.menuItemRepo.find({where: {isUser: false}});
        return {
            menuArray: menuItems
        }
    }

}
