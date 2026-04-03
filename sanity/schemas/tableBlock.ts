import { defineField, defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'tableBlock',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({
      name: 'headers',
      title: 'Column Headers',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'One entry per column header.',
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'tableRow',
          title: 'Row',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'One entry per cell. Must match the number of headers.',
            }),
          ],
          preview: {
            select: { cells: 'cells' },
            prepare({ cells }: any) {
              return { title: Array.isArray(cells) ? cells.join(' | ') : 'Row' }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { headers: 'headers', rows: 'rows' },
    prepare({ headers, rows }: any) {
      const cols = Array.isArray(headers) ? headers.length : 0
      const rowCount = Array.isArray(rows) ? rows.length : 0
      return {
        title: `Table: ${Array.isArray(headers) ? headers.join(' | ') : 'No headers'}`,
        subtitle: `${cols} columns · ${rowCount} rows`,
      }
    },
  },
})
