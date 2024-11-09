// components/ui/data-table.tsx
import React from 'react'
import { useTranslations } from '@/hooks/useTranslations'
import { cn } from '@/utils/cn'

interface DataTableProps<T> {
  data: T[]
  columns: {
    key: keyof T
    header: string
    width?: string
  }[]
  className?: string
}

export function DataTable<T>({ data, columns, className }: DataTableProps<T>) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((column) => (
              <th 
                key={String(column.key)} 
                className="p-4 text-left"
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              {columns.map((column) => (
                <td key={String(column.key)} className="p-4">
                  {String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
