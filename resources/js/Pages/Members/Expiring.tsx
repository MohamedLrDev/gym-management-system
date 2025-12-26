import React, { useEffect, useState } from "react";

interface ExpiringMember {
  member_id: number;
  member_name: string;
  email: string;
  end_date: string;
  days_left: number;
}

const ExpiringMemberships: React.FC = () => {
  const [members, setMembers] = useState<ExpiringMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch expiring memberships from your Laravel API
  const fetchExpiringMembers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/members/expiring");
      const data = await res.json();
      setMembers(
        data.memberships.map((m: any) => ({
          ...m,
          days_left: Math.max(
            0,
            Math.floor(
              (new Date(m.end_date).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            )
          ),
        }))
      );
      setLoading(false);
    } catch (err) {
      console.error("Error fetching expiring memberships:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpiringMembers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Memberships Expiring Within 7 Days
      </h2>

      {members.length === 0 ? (
        <p className="text-green-600">🎉 No memberships expiring soon!</p>
      ) : (
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Expiration Date</th>
              <th className="px-4 py-2 border">Days Left</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr
                key={member.member_id}
                className={member.days_left <= 3 ? "bg-red-100" : "bg-yellow-100"}
              >
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{member.member_name}</td>
                <td className="px-4 py-2 border">{member.email}</td>
                <td className="px-4 py-2 border">{member.end_date}</td>
                <td className="px-4 py-2 border">{member.days_left}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpiringMemberships;
