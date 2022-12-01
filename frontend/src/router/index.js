import { createWebHistory, createRouter } from "vue-router";
import Author from "@/views/Author.vue";
import Book from "@/views/Book.vue";

const routes = [
    {
        path: "/",
        name: "books",
        component: Book,
    },
    {
        path: "/authors",
        name: "authors",
        component: Author,
    },

    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

    {
        path: "/authors/:id",
        name: "author.edit",
        component: () => import("@/views/AuthorEdit.vue"),
        props: true
    },

    {
        path: "/authors/add",
        name: "author.add",
        component: () => import("@/views/AuthorAdd.vue"),
    },

    {
        path: "/books/:id",
        name: "book.detail",
        component: () => import("@/views/BookDetail2.vue"),
    },

    {
        path: "/books/add",
        name: "book.add",
        component: () => import("@/views/BookAdd.vue"),
    },

    {
        path: "/books/:id",
        name: "book.edit",
        component: () => import("@/views/BookEdit.vue"),
        props: true
    },
    {
        path: "/books/detail/:id",
        name: "book.detail",
        component: () => import("@/views/BookDetail.vue"),
        props: true
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;