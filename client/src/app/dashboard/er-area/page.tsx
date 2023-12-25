"use client";

import Sidebar from "@/core/layout/sidebar/index";
import ERVisitsTableComponent from "@/modules/er-area/presentation/pages/er-visits";

// ----------------------------------------------------------------------

export default function AllUsers() {
    return (
        <div>
            <Sidebar>
                <ERVisitsTableComponent />
            </Sidebar>
        </div>
    );
}
