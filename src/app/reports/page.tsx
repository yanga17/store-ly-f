'use client'

import axios from "axios";
import moment from 'moment';
import { useSession } from "@/context";
import { useAudit } from "@/shared/tools/auditMonit";
import { ReportsModule } from "@/modules/reports/reportsModule"

export default function Reports() {


    return (
        <div className="w-full h-full flex justify-between px-4 py-4 gap-2 rounded-lg">
            <ReportsModule />
        </div>
    );
}