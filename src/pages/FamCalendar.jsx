export default function FamCalendar() {
    return (
        <div className="py-8 space-y-6">
            <h2 className="text-2xl font-bold text-[#4799cc]">FamCalendar</h2>
            <p className="text-sm text-gray-700">
                A web-based <strong>Progressive Web App (PWA)</strong> enabling real-time calendar sharing across family and friends.
                Integrates with <strong>iCloud</strong> via open-source pyicloud to securely sync events, with role-based access control.
            </p>
            <video controls className="w-full rounded-xl shadow-md">
                <source src="/famcalendar_demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <p className="text-sm text-gray-700">
                * Would be available soon. Fixing privacy issue.
            </p>
        </div>
    )
}