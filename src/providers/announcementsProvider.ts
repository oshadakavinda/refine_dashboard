import { DataProvider } from "@refinedev/core";

const ANNOUNCEMENTS_KEY = "announcements_data";

// Helper to get current user (you can customize this)
const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return {
        id: user.id || "1",
        name: user.name || "Current User",
        avatarUrl: user.avatarUrl || null,
    };
};

// Helper functions for localStorage
const getAnnouncements = (): any[] => {
    const data = localStorage.getItem(ANNOUNCEMENTS_KEY);
    return data ? JSON.parse(data) : [];
};

const saveAnnouncements = (announcements: any[]) => {
    localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(announcements));
};

export const announcementsProvider: DataProvider = {
    getList: async ({ pagination, sorters, filters }) => {
        const announcements = getAnnouncements();

        let filteredData = [...announcements];

        // Apply filters
        if (filters) {
            filters.forEach((filter: any) => {
                if (filter.field === "title" && filter.value) {
                    filteredData = filteredData.filter((item) =>
                        item.title.toLowerCase().includes(filter.value.toLowerCase())
                    );
                }
            });
        }

        // Apply sorting
        if (sorters && sorters.length > 0) {
            const sorter = sorters[0];
            filteredData.sort((a, b) => {
                const aValue = a[sorter.field];
                const bValue = b[sorter.field];

                if (sorter.order === "asc") {
                    return aValue > bValue ? 1 : -1;
                }
                return aValue < bValue ? 1 : -1;
            });
        }

        // Apply pagination
        const { current = 1, pageSize = 10 } = pagination || {};
        const start = (current - 1) * pageSize;
        const end = start + pageSize;
        const paginatedData = filteredData.slice(start, end);

        return {
            data: paginatedData,
            total: filteredData.length,
        };
    },

    getOne: async ({ id }) => {
        const announcements = getAnnouncements();
        const announcement = announcements.find((item) => item.id === id);

        if (!announcement) {
            throw new Error("Announcement not found");
        }

        return {
            data: announcement,
        };
    },

    create: async ({ variables }) => {
        const announcements = getAnnouncements();
        const currentUser = getCurrentUser();

        const newAnnouncement = {
            id: String(Date.now()),
            title: variables.title,
            content: variables.content,
            author: currentUser,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        announcements.push(newAnnouncement);
        saveAnnouncements(announcements);

        return {
            data: newAnnouncement,
        };
    },

    update: async ({ id, variables }) => {
        const announcements = getAnnouncements();
        const index = announcements.findIndex((item) => item.id === id);

        if (index === -1) {
            throw new Error("Announcement not found");
        }

        announcements[index] = {
            ...announcements[index],
            title: variables.title,
            content: variables.content,
            updatedAt: new Date().toISOString(),
        };

        saveAnnouncements(announcements);

        return {
            data: announcements[index],
        };
    },

    deleteOne: async ({ id }) => {
        const announcements = getAnnouncements();
        const filteredAnnouncements = announcements.filter((item) => item.id !== id);

        saveAnnouncements(filteredAnnouncements);

        return {
            data: { id },
        };
    },

    getApiUrl: () => "",

    // Required methods that won't be used
    deleteMany: async () => ({ data: [] }),
    createMany: async () => ({ data: [] }),
    updateMany: async () => ({ data: [] }),
    getMany: async ({ ids }) => {
        const announcements = getAnnouncements();
        const filteredAnnouncements = announcements.filter((item) =>
            ids.includes(item.id)
        );
        return { data: filteredAnnouncements };
    },
    custom: async () => ({ data: {} }),
};
