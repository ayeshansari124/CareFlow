"use client";

export default function AdminTable({ columns, children }) {
  return (
    <div
      className="
        bg-white
        rounded-[32px]
        shadow-[0_8px_30px_rgba(0,0,0,0.06)]
        overflow-hidden
        border border-gray-100
      "
    >
      <table className="w-full">
        <thead
          className="
            bg-gray-50/70
            border-b border-gray-100
          "
        >
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="
                  px-6 py-5
                  text-left
                  text-sm
                  font-semibold
                  text-gray-500
                "
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
