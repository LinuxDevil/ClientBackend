import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuItem } from 'src/entities/menuitem.entity';
import { Constants } from 'src/helpers/Constants';
import { MenuItemmDTO } from 'src/models/menuitem.model';
import { Repository } from 'typeorm';

@Injectable()
export class MenuitemsService {
  constructor(
    @InjectRepository(MenuItem) private menuItemRepo: Repository<MenuItem>,
  ) {}

  async addMenuItem(menuItem: MenuItemmDTO) {
    try {
      const menuItemFund = await this.menuItemRepo.findOne({
        where: { id: menuItem.nameEn },
        loadRelationIds: true,
      });
      if (menuItemFund !== null) {
        const menuItemEntity: MenuItem = await this.menuItemRepo.create(
          menuItem,
        );
        await menuItemEntity.save();
        return {
          menuItemEntity,
          status: new Constants().PREMADE_STATUS.Success_Created,
        };
      } else {
        return {
          message: 'There is already a menu item with that name',
          status: new Constants().PREMADE_STATUS.Fail_Created,
        };
      }
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async addSubMenuItem(menuItem: MenuItemmDTO) {
    try {
      const menuItemFnd = await this.menuItemRepo.findOne({
        where: { id: menuItem.nameEn },
        loadRelationIds: true,
      });
      if (menuItemFnd !== null) {
        const menuItemEntity: MenuItem = await this.menuItemRepo.create(
          menuItem,
        );
        await menuItemEntity.save();
        return {
          menuItemEntity,
          status: new Constants().PREMADE_STATUS.Success_Created,
        };
      } else {
        return {
          message: 'There is already a menu item with that name',
          status: new Constants().PREMADE_STATUS.Fail_Created,
        };
      }
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async removeMenuItem(menuItemId: string) {
    try {
      const menuItem = await this.menuItemRepo.findOne({
        where: { id: menuItemId },
        loadRelationIds: true,
      });
      await menuItem.remove();
      return {
        menuItem,
        status: new Constants().PREMADE_STATUS.SUCCESS_DELETED,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async updateMenuItem(menuItemId: string, menuItemUpdate: MenuItemmDTO) {
    try {
      const menuItem = await this.menuItemRepo.update(
        { id: +menuItemId },
        menuItemUpdate,
      );
      return {
        menuItem,
        status: new Constants().PREMADE_STATUS.SUCCESS_UPDATED,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async findSubUserMenuItems(langId: string) {
    try {
      const menuItems = await this.menuItemRepo.find({
        where: { isSub: true },
        loadRelationIds: true,
      });
      const menuItemNames = [];
      menuItems.forEach((item) => {
        if (langId === '1') {
          menuItemNames.push(item.nameEn);
        } else {
          menuItemNames.push(item.nameAr);
        }
      });
      return {
        menuArray: menuItems,
        length: menuItems.length,
        menuItemNames,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async findUserMenuItems(langId: string) {
    try {
      const menuItems = await this.menuItemRepo.find({
        where: { isUser: true },
        loadRelationIds: true,
      });
      const menuItemNames = [];
      menuItems.forEach((item) => {
        if (langId === '1') {
          menuItemNames.push(item.nameEn);
        } else {
          menuItemNames.push(item.nameAr);
        }
      });
      return {
        menuArray: menuItems,
        length: menuItems.length,
        menuItemNames,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async findDoctorMenuItems(langId: string) {
    try {
      const menuItems = await this.menuItemRepo.find({
        where: { isUser: false },
        loadRelationIds: true,
      });
      const menuItemNames = [];
      menuItems.forEach((item) => {
        if (langId === '1') {
          menuItemNames.push(item.nameEn);
        } else {
          menuItemNames.push(item.nameAr);
        }
      });
      return {
        menuArray: menuItems,
        length: menuItems.length,
        menuItemNames,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }
}
