import React from 'react';
import { Terminal } from '../types';
import { useI18n } from '../i18n';

interface WarrantyManagerProps {
  terminals: Terminal[];
  onUpdateTerminal: (id: string, fields: Partial<Terminal>) => Promise<void>;
}

export default function WarrantyManager({ terminals, onUpdateTerminal }: WarrantyManagerProps) {
  return (
    const { t } = useI18n();
    <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
    <h2 className="text-xl font-bold mb-6 text-slate-100">{t('warranty_management')}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="text-xs uppercase bg-slate-800 text-slate-300">
            <tr>
              <th className="px-4 py-3">{t('model_label')}</th>
              <th className="px-4 py-3">{t('serial_number_label')}</th>
              <th className="px-4 py-3">{t('serial_number_label')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {terminals.map((t) => (
              <tr key={t.id} className="hover:bg-slate-800/50">
                <td className="px-4 py-3 text-slate-200">{t.model}</td>
                <td className="px-4 py-3 font-mono">{t.serialNumber}</td>
                <td className="px-4 py-3">
                  <input 
                    type="date"
                    className="bg-slate-950 p-2 rounded border border-slate-700 text-slate-200 focus:border-blue-500 outline-none"
                    defaultValue={t.warrantyDate || ''}
                    onChange={(e) => onUpdateTerminal(t.id, { warrantyDate: e.target.value })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
