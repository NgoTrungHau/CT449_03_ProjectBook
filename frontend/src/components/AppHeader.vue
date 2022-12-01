<template>
    <nav class="navbar navbar-expand navbar-dark  shadow p-2 mb-6 rounded appheader">
        <a href="/" class="navbar-brand m-2"><strong>Ứng dụng Quản lý sách</strong></a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'books' }" class="nav-link">
                    <strong>Sách </strong>
                    <i class="fas fa-book"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'authors' }" class="nav-link">
                    <strong>Tác giả </strong>
                    <i class="fas fa-address-book"></i>
                </router-link>
            </li>
        </div>
    </nav>
</template>
