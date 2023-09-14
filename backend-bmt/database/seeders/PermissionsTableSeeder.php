<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        //permission for posts
        Permission::create(['name' => 'posts.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'posts.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'posts.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'posts.delete', 'guard_name' => 'api']);

        //permission for categories
        Permission::create(['name' => 'categories.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'categories.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'categories.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'categories.delete', 'guard_name' => 'api']);

        //permission for sliders
        Permission::create(['name' => 'sliders.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'sliders.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'sliders.delete', 'guard_name' => 'api']);

        //permission for roles
        Permission::create(['name' => 'roles.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'roles.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'roles.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'roles.delete', 'guard_name' => 'api']);

        //permission for permissions
        Permission::create(['name' => 'permissions.index', 'guard_name' => 'api']);

        //permission for users
        Permission::create(['name' => 'users.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'users.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'users.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'users.delete', 'guard_name' => 'api']);

        //permission for products
        Permission::create(['name' => 'products.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'products.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'products.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'products.delete', 'guard_name' => 'api']);

        //permission for pages
        Permission::create(['name' => 'pages.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'pages.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'pages.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'pages.delete', 'guard_name' => 'api']);

        //permission for photos
        Permission::create(['name' => 'photos.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'photos.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'photos.delete', 'guard_name' => 'api']);

        //permission for aparaturs
        Permission::create(['name' => 'aparaturs.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'aparaturs.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'aparaturs.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'aparaturs.delete', 'guard_name' => 'api']);


        //permission for savings
        Permission::create(['name' => 'savings.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'savings.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'savings.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'savings.delete', 'guard_name' => 'api']);

        //permission for finances
        Permission::create(['name' => 'finances.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'finances.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'finances.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'finances.delete', 'guard_name' => 'api']);
        //permission for careers
        Permission::create(['name' => 'careers.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'careers.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'careers.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'careers.delete', 'guard_name' => 'api']);
        //permission for ziswafs
        Permission::create(['name' => 'ziswafs.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'ziswafs.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'ziswafs.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'ziswafs.delete', 'guard_name' => 'api']);
        //permission for layanans
        Permission::create(['name' => 'layanans.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'layanans.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'layanans.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'layanans.delete', 'guard_name' => 'api']);
    }
}