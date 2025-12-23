"use client"

import { useState } from "react"
import { Button } from "primereact/button"
import PeriodicUpdatesDialog from "@/components/periodic-updates-dialog"

const sampleUpdates = [
  {
    id: 43,
    identificationDate: "2025-12-12",
    json: [
      {
        name: "title",
        value: "Software Engineer",
      },
      {
        name: "organization",
        fields: [
          {
            name: "id",
            value: 4,
          },
          {
            name: "name",
            value: "BizKonnect",
          },
        ],
      },
      {
        name: "person",
        fields: [
          {
            name: "id",
            value: 3,
          },
          {
            name: "value",
            value: "Rahul Dhongade",
          },
        ],
      },
    ],
    organization_id: null,
    person_id: 3,
    periodicupdatetype_id: 14,
  },
  {
    id: 42,
    identificationDate: "2025-12-12",
    json: [
      {
        name: "organization",
        fields: [
          {
            name: "id",
            value: 4,
          },
          {
            name: "name",
            value: "BizKonnect",
          },
        ],
      },
      {
        name: "person",
        fields: [
          {
            name: "id",
            value: 3,
          },
          {
            name: "value",
            value: "Rahul Dhongade",
          },
        ],
      },
    ],
    organization_id: null,
    person_id: 3,
    periodicupdatetype_id: 13,
  },
  {
    id: 41,
    identificationDate: "2025-12-12",
    json: [
      {
        name: "title",
        value: "CTO and Co-Founder at BizKonnect",
      },
      {
        name: "organization",
        fields: [
          {
            name: "id",
            value: 4,
          },
          {
            name: "name",
            value: "BizKonnect",
          },
        ],
      },
      {
        name: "person",
        fields: [
          {
            name: "id",
            value: 3,
          },
          {
            name: "value",
            value: "Rahul Dhongade",
          },
        ],
      },
    ],
    organization_id: null,
    person_id: 3,
    periodicupdatetype_id: 12,
  },
  {
    id: 40,
    identificationDate: "2025-12-12",
    json: [
      {
        name: "organization",
        fields: [
          {
            name: "id",
            value: 4,
          },
          {
            name: "name",
            value: "BizKonnect",
          },
        ],
      },
      {
        name: "person",
        fields: [
          {
            name: "id",
            value: 3,
          },
          {
            name: "value",
            value: "Rahul Dhongade",
          },
        ],
      },
    ],
    organization_id: null,
    person_id: 3,
    periodicupdatetype_id: 11,
  },
  {
    id: 37,
    identificationDate: "2025-12-10",
    json: [
      {
        name: "skills",
        value: ["GenAI"],
      },
      {
        name: "person",
        fields: [
          {
            name: "id",
            value: 1,
          },
          {
            name: "value",
            value: "Ninaad Joshi",
          },
        ],
      },
    ],
    organization_id: null,
    person_id: 1,
    periodicupdatetype_id: 10,
  },
  {
    id: 38,
    identificationDate: "2025-12-12",
    json: [
      {
        name: "skills",
        value: ["GenAI"],
      },
      {
        name: "person",
        fields: [
          {
            name: "id",
            value: 3,
          },
          {
            name: "value",
            value: "Rahul Dhongade",
          },
        ],
      },
    ],
    organization_id: null,
    person_id: 3,
    periodicupdatetype_id: 10,
  },
]

export default function Home() {
  const [visible, setVisible] = useState(false)

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
              <i className="pi pi-chart-line" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">Periodic Updates Viewer</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Professional activity feed for tracking person and organization updates with multiple visualization modes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-4">
              <i className="pi pi-clock" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Timeline View</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Chronological activity stream with visual markers and colored indicators for each update type
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 text-2xl mb-4">
              <i className="pi pi-th-large" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Grid View</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Card-based layout with hover effects and color-coded borders for quick scanning
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 text-2xl mb-4">
              <i className="pi pi-list" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Grouped View</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Organized by update type with collapsible sections and count badges for easy navigation
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-12 rounded-3xl shadow-2xl text-center text-white mb-12">
          <h2 className="text-3xl font-bold mb-4">View Sample Updates</h2>
          <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
            Explore {sampleUpdates.length} periodic updates with dynamic icons, multiple view modes, and professional
            styling
          </p>
          <Button
            label="Open Updates Dialog"
            icon="pi pi-external-link"
            onClick={() => setVisible(true)}
            className="bg-white text-blue-600 hover:bg-blue-50 border-0 px-8 py-3 text-lg font-semibold shadow-lg"
          />
        </div>
{/*  
        <div className="bg-white p-8 rounded-2xl border border-slate-200">
          <h3 className="text-2xl font-semibold text-slate-900 mb-6">Supported Update Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                <i className="pi pi-building" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Organization Updates</h4>
                <p className="text-sm text-slate-600">
                  Acquisitions, Mergers, Certifications, Awards, Digital Transformation, Expansion, Future Plans
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                <i className="pi pi-user" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Person Updates</h4>
                <p className="text-sm text-slate-600">
                  Employment Changes, New Skills, Certifications, Contact Info, Position Updates
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <i className="pi pi-info-circle text-blue-600" />
              Features
            </h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <i className="pi pi-check text-emerald-600" />
                Dynamic icons and colors for all 14 update types
              </li>
              <li className="flex items-center gap-2">
                <i className="pi pi-check text-emerald-600" />
                Three distinct visualization modes (Timeline, Grid, Grouped)
              </li>
              <li className="flex items-center gap-2">
                <i className="pi pi-check text-emerald-600" />
                Responsive design with mobile-optimized layouts
              </li>
              <li className="flex items-center gap-2">
                <i className="pi pi-check text-emerald-600" />
                Smooth transitions and hover effects for better UX
              </li>
            </ul>
          </div>
        </div>
*/}
      </div>

      <PeriodicUpdatesDialog
        visible={visible}
        onHide={() => setVisible(false)}
        updates={sampleUpdates}
        personName="User"
      />
    </main>
  )
}
