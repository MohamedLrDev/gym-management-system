export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};

export interface Member {
    id: number;
    name: string;
    email: string;
    phone: string;
    // membership_status: string;
    membership_end_date: string | null;
    created_at: string;
    updated_at: string;
}

export interface Payment {
    id: number;
    amount: number;
    created_at: string;
    updated_at: string;
    member?: Member;
}
export interface Statistics {
    total_members: number;
    premium_members: number;
    basic_members: number;
    expiring_soon: number;
    total_payments: number;
    monthly_revenue: number;
    recent_members: Member[];
    recent_payments: Payment[];
}