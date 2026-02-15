import type { ReactNode } from "react";

interface TableProps {
	headers: string[];
	rows: (string | ReactNode)[][];
}

export function Table({ headers, rows }: TableProps) {
	return (
		<div className="mb-6 rounded-xl border border-border overflow-hidden transition-colors duration-150">
			<table className="w-full text-[13px]">
				<thead>
					<tr className="bg-accent/40 border-b border-border transition-colors duration-150">
						{headers.map((h) => (
							<th
								key={h}
								className="text-left px-4 py-2.5 font-medium text-muted-foreground text-[11px] uppercase tracking-wider transition-colors duration-150"
							>
								{h}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, i) => (
						<tr
							key={`row-${i.toString()}`}
							className="border-t border-neutral-100 dark:border-neutral-800 first:border-t-0 transition-colors duration-150"
						>
							{row.map((cell, j) => (
								<td
									key={`cell-${i.toString()}-${j.toString()}`}
									className={`px-4 py-2.5 align-top transition-colors duration-150 ${j === 0 ? "font-mono text-[12px] text-neutral-950 dark:text-white font-medium" : "text-neutral-500 dark:text-neutral-400"}`}
								>
									{cell ?? "—"}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
