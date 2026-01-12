import React, { useState, useEffect } from 'react';
import { Alert } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';

const ANNOUNCEMENTS_KEY = "announcements_data";
const DISMISSED_KEY = "dismissed_announcement_id";

const AnnouncementBanner: React.FC = () => {
    const [latestAnnouncement, setLatestAnnouncement] = useState<any>(null);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        // Get announcements from localStorage
        const data = localStorage.getItem(ANNOUNCEMENTS_KEY);
        const announcements = data ? JSON.parse(data) : [];

        if (announcements.length > 0) {
            // Sort by createdAt to get the latest
            const sorted = announcements.sort((a: any, b: any) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            const latest = sorted[0];

            // Check if this announcement was already dismissed
            const dismissedId = localStorage.getItem(DISMISSED_KEY);
            if (dismissedId !== latest.id) {
                setLatestAnnouncement(latest);
            }
        }
    }, []);

    const handleDismiss = () => {
        if (latestAnnouncement) {
            localStorage.setItem(DISMISSED_KEY, latestAnnouncement.id);
            setDismissed(true);
        }
    };

    if (!latestAnnouncement || dismissed) {
        return null;
    }

    return (
        <Alert
            message={
                <span>
                    <NotificationOutlined style={{ marginRight: 8 }} />
                    <strong>Announcement:</strong> {latestAnnouncement.title}
                </span>
            }
            type="info"
            closable
            onClose={handleDismiss}
            style={{
                marginBottom: 16,
                borderRadius: 8,
            }}
            banner
        />
    );
};

export default AnnouncementBanner;
