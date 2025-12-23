"use client"

import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { Chip } from "primereact/chip"
import { Tag } from "primereact/tag"
import { useState } from "react"
import styles from "./periodic-updates-dialog.module.css"

// Icon mapping for each periodic update type
const updateTypeIcons: Record<number, string> = {
  1: "pi-building", // Acquisition and Mergers
  2: "pi-verified", // Certifications
  3: "pi-trophy", // Awards
  4: "pi-chart-line", // Digital Transformation
  5: "pi-map", // Expansion
  6: "pi-compass", // Future Plans
  7: "pi-shield", // NEW_CERTIFICATION (Person)
  8: "pi-phone", // NEW_PHONE_NUMBER
  9: "pi-envelope", // NEW_EMAIL_ADDRESS
  10: "pi-wrench", // NEW_SKILL
  11: "pi-sign-out", // EMPLOYMENT_ENDED
  12: "pi-times-circle", // CLOSED_PREVIOUS_POSITION
  13: "pi-replay", // EMPLOYMENT_REACTIVATED
  14: "pi-briefcase", // NEW_POSITION_EXISTING_EMPLOYMENT
}

const updateTypeColors: Record<number, string> = {
  1: "#3B82F6", // blue
  2: "#10B981", // green
  3: "#F59E0B", // amber
  4: "#8B5CF6", // violet
  5: "#EC4899", // pink
  6: "#06B6D4", // cyan
  7: "#10B981", // green
  8: "#3B82F6", // blue
  9: "#8B5CF6", // violet
  10: "#F59E0B", // amber
  11: "#EF4444", // red
  12: "#6B7280", // gray
  13: "#10B981", // green
  14: "#3B82F6", // blue
}

const updateTypeLabels: Record<number, string> = {
  1: "Acquisition & Mergers",
  2: "Certifications",
  3: "Awards",
  4: "Digital Transformation",
  5: "Expansion",
  6: "Future Plans",
  7: "New Certification",
  8: "New Phone Number",
  9: "New Email Address",
  10: "New Skill",
  11: "Employment Ended",
  12: "Closed Previous Position",
  13: "Employment Reactivated",
  14: "New Position",
}

interface PeriodicUpdate {
  id: number
  identificationDate: string
  json: Array<{
    name: string
    value?: any
    fields?: Array<{ name: string; value: any }>
  }>
  organization_id: number | null
  person_id: number | null
  periodicupdatetype_id: number
}

interface PeriodicUpdatesDialogProps {
  visible: boolean
  onHide: () => void
  updates: PeriodicUpdate[]
  personName?: string
}

export default function PeriodicUpdatesDialog({
  visible,
  onHide,
  updates,
  personName = "User",
}: PeriodicUpdatesDialogProps) {
  const [viewMode, setViewMode] = useState<"timeline" | "grid" | "grouped">("timeline")

  const getPersonName = (update: PeriodicUpdate) => {
    const personField = update.json.find((item) => item.name === "person")
    if (personField?.fields) {
      const nameField = personField.fields.find((f) => f.name === "value")
      return nameField?.value || personName
    }
    return personName
  }

  const getOrganizationName = (update: PeriodicUpdate) => {
    const orgField = update.json.find((item) => item.name === "organization")
    if (orgField?.fields) {
      const nameField = orgField.fields.find((f) => f.name === "name")
      return nameField?.value
    }
    return null
  }

  const getUpdateValue = (update: PeriodicUpdate) => {
    const titleField = update.json.find((item) => item.name === "title")
    const skillsField = update.json.find((item) => item.name === "skills")

    if (titleField?.value) return titleField.value
    if (skillsField?.value) return Array.isArray(skillsField.value) ? skillsField.value.join(", ") : skillsField.value

    return "Update"
  }

  const renderTimelineView = () => {
    const sortedUpdates = [...updates].sort(
      (a, b) => new Date(b.identificationDate).getTime() - new Date(a.identificationDate).getTime(),
    )

    return (
      <div className={styles.timelineContainer}>
        {sortedUpdates.map((update) => {
          const icon = updateTypeIcons[update.periodicupdatetype_id] || "pi-info-circle"
          const color = updateTypeColors[update.periodicupdatetype_id] || "#6B7280"
          const label = updateTypeLabels[update.periodicupdatetype_id] || "Update"
          const orgName = getOrganizationName(update)
          const updateValue = getUpdateValue(update)

          return (
            <div key={update.id} className={styles.timelineItem}>
              <div className={styles.timelineMarker} style={{ backgroundColor: color }}>
                <i className={`pi ${icon}`} />
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineHeader}>
                  <Tag value={label} style={{ backgroundColor: color }} icon={`pi ${icon}`} />
                  <span className={styles.timelineDate}>
                    {new Date(update.identificationDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h4 className={styles.timelineTitle}>{updateValue}</h4>
                {orgName && (
                  <p className={styles.timelineOrg}>
                    <i className="pi pi-building" style={{ marginRight: "0.5rem" }} />
                    {orgName}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderGridView = () => {
    return (
      <div className={styles.gridContainer}>
        {updates.map((update) => {
          const icon = updateTypeIcons[update.periodicupdatetype_id] || "pi-info-circle"
          const color = updateTypeColors[update.periodicupdatetype_id] || "#6B7280"
          const label = updateTypeLabels[update.periodicupdatetype_id] || "Update"
          const orgName = getOrganizationName(update)
          const updateValue = getUpdateValue(update)

          return (
            <div key={update.id} className={styles.gridCard}>
              <div className={styles.gridCardHeader} style={{ borderLeftColor: color }}>
                <div className={styles.gridCardIcon} style={{ backgroundColor: `${color}20` }}>
                  <i className={`pi ${icon}`} style={{ color }} />
                </div>
                <div className={styles.gridCardMeta}>
                  <Tag value={label} style={{ backgroundColor: color }} />
                  <span className={styles.gridCardDate}>
                    {new Date(update.identificationDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div className={styles.gridCardBody}>
                <h4>{updateValue}</h4>
                {orgName && (
                  <p className={styles.gridCardOrg}>
                    <i className="pi pi-building" />
                    {orgName}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderGroupedView = () => {
    const grouped = updates.reduce(
      (acc, update) => {
        const typeId = update.periodicupdatetype_id
        if (!acc[typeId]) acc[typeId] = []
        acc[typeId].push(update)
        return acc
      },
      {} as Record<number, PeriodicUpdate[]>,
    )

    return (
      <div className={styles.groupedContainer}>
        {Object.entries(grouped).map(([typeId, items]) => {
          const icon = updateTypeIcons[Number(typeId)] || "pi-info-circle"
          const color = updateTypeColors[Number(typeId)] || "#6B7280"
          const label = updateTypeLabels[Number(typeId)] || "Update"

          return (
            <div key={typeId} className={styles.groupedSection}>
              <div className={styles.groupedHeader} style={{ backgroundColor: `${color}15` }}>
                <div className={styles.groupedHeaderLeft}>
                  <div className={styles.groupedIcon} style={{ backgroundColor: color }}>
                    <i className={`pi ${icon}`} />
                  </div>
                  <h3>{label}</h3>
                </div>
                <Chip label={items.length} style={{ backgroundColor: color }} />
              </div>
              <div className={styles.groupedItems}>
                {items.map((update) => {
                  const orgName = getOrganizationName(update)
                  const updateValue = getUpdateValue(update)

                  return (
                    <div key={update.id} className={styles.groupedItem}>
                      <div className={styles.groupedItemContent}>
                        <span className={styles.groupedItemTitle}>{updateValue}</span>
                        {orgName && (
                          <span className={styles.groupedItemOrg}>
                            <i className="pi pi-building" />
                            {orgName}
                          </span>
                        )}
                      </div>
                      <span className={styles.groupedItemDate}>
                        {new Date(update.identificationDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const header = (
    <div className={styles.dialogHeader}>
      <div className={styles.dialogHeaderLeft}>
        <h2>Periodic Updates</h2>
        <Chip label={`${updates.length} updates`} />
      </div>
      <div className={styles.dialogHeaderRight}>
        <Button
          icon="pi pi-clock"
          rounded
          text
          severity={viewMode === "timeline" ? "info" : "secondary"}
          onClick={() => setViewMode("timeline")}
          tooltip="Timeline View"
        />
        <Button
          icon="pi pi-th-large"
          rounded
          text
          severity={viewMode === "grid" ? "info" : "secondary"}
          onClick={() => setViewMode("grid")}
          tooltip="Grid View"
        />
        <Button
          icon="pi pi-list"
          rounded
          text
          severity={viewMode === "grouped" ? "info" : "secondary"}
          onClick={() => setViewMode("grouped")}
          tooltip="Grouped View"
        />
      </div>
    </div>
  )

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={header}
      style={{ width: "90vw", maxWidth: "1200px" }}
      contentClassName={styles.dialogContent}
      modal
    >
      {updates.length === 0 ? (
        <div className={styles.emptyState}>
          <i className="pi pi-inbox" />
          <h3>No Updates Found</h3>
          <p>There are no periodic updates to display at this time.</p>
        </div>
      ) : (
        <>
          {viewMode === "timeline" && renderTimelineView()}
          {viewMode === "grid" && renderGridView()}
          {viewMode === "grouped" && renderGroupedView()}
        </>
      )}
    </Dialog>
  )
}
