import { pricing } from "@/lib/content";

export default function Pricing() {
  return (
    <section id="cenik" className="py-20">
      <div className="container-x max-w-4xl">
        <h2 className="section-title text-center">{pricing.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-forest-900/70">
          {pricing.intro}
        </p>
        <div className="mt-10 overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-forest-50 text-forest-800">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold">Sezóna</th>
                <th className="px-6 py-4 text-sm font-semibold">Termíny</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">
                  Cena / noc
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-100">
              {pricing.rows.map((r) => (
                <tr key={r.season}>
                  <td className="px-6 py-4 font-medium text-forest-900">
                    {r.season}
                  </td>
                  <td className="px-6 py-4 text-forest-900/70">{r.note}</td>
                  <td className="px-6 py-4 text-right font-semibold text-forest-700">
                    {r.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center text-sm text-forest-900/60">
          {pricing.footnote}
        </p>
      </div>
    </section>
  );
}
