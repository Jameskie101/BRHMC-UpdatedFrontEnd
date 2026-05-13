import NurseSidebar from "@/components/custom-sidebar/nurseSidebar";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

/* patient accomodation module */
const RegDetails = () => {
  const [open, setOpen] = useState(false);
  const [showEditRoomModal, setShowEditRoomModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showRecordDetailsModal, setShowRecordDetailsModal] = useState(false);

  const [infoMessage, setInfoMessage] = useState("");
  const [selectedTransferWard, setSelectedTransferWard] = useState("Ward 1A - Medicine");
  const [selectedTransferBed, setSelectedTransferBed] = useState<string | null>(null);
  const [selectedEditRoom, setSelectedEditRoom] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<AccomodationRecord | null>(null);

  const location = useLocation();

  type AccomodationRecord = {
    id: number;
    ward: string;
    room: string;
    bed: string;
    dateFrom: string;
    dateTo: string;
    lengthOfStay: string;
    status: "Active" | "Inactive";
  };

  type RoomBed = {
    bed: string;
    status: "Occupied" | "Vacant";
    allowedOccupant: number;
    actualOccupant: number;
    patient?: string;
  };

  type RoomGroup = {
    roomName: string;
    beds: RoomBed[];
  };

  const [mockPatientProfile] = useState({
    hospitalNumber: "000000000777288",
    lastName: "DO",
    firstName: "REA",
    middleName: "MON",
    address: "111 Estanza, Legazpi City, Albay",
  });

  const [accomodationRecords, setAccomodationRecords] = useState<AccomodationRecord[]>([
    {
      id: 1,
      ward: "Ph Med",
      room: "6104",
      bed: "000",
      dateFrom: "03/21/26 02:45 PM",
      dateTo: "-",
      lengthOfStay: "0 day and 1 hr",
      status: "Active",
    },
  ]);

  const transferWards = [
    "CCU",
    "MICU",
    "NICU",
    "NICU Trans",
    "PICU",
    "PIMAM",
    "Private/Pay",
    "SICU",
    "Surge Ward",
    "Ward 1A - Medicine",
    "Ward 1B - Medicine",
    "Ward 1C - Medicine",
    "Ward 2A - Pedia",
    "Ward 2B - Pedia",
    "Ward 3A - Surgery",
    "Ward 3B - Surgery",
    "Ward 3C - Surgery",
    "Ward 4A - Ob Gyne",
    "Ward 4B - Ob Gyne",
    "Ward 4C - Ob Gyne",
  ];

  const transferRoomGroups: Record<string, RoomGroup[]> = {
    "Ward 1A - Medicine": [
      {
        roomName: "RM1A",
        beds: [
          {
            bed: "---",
            status: "Occupied",
            allowedOccupant: 50,
            actualOccupant: 34,
            patient: "000000000777288 - DO, REA MON",
          },
          {
            bed: "Bed 001",
            status: "Occupied",
            allowedOccupant: 1,
            actualOccupant: 1,
            patient: "000000000774773 - LAURETA, LEA OSTRIA",
          },
          {
            bed: "Bed 002",
            status: "Occupied",
            allowedOccupant: 1,
            actualOccupant: 1,
          },
          {
            bed: "Bed 003",
            status: "Occupied",
            allowedOccupant: 1,
            actualOccupant: 1,
            patient: "000000000730927 - ELLA, JOSEFINA BOROC",
          },
          {
            bed: "Bed 004",
            status: "Occupied",
            allowedOccupant: 1,
            actualOccupant: 1,
            patient: "000000000024412 - NUEVA, PATRIA LIM",
          },
          {
            bed: "Bed 005",
            status: "Occupied",
            allowedOccupant: 1,
            actualOccupant: 1,
            patient: "000000001011233 - MORCOZO, AILEEN CALSADO",
          },
          {
            bed: "Bed 006",
            status: "Occupied",
            allowedOccupant: 1,
            actualOccupant: 1,
            patient: "000000000783429 - ESTEVES, SERINE GUEVARRA",
          },
          {
            bed: "Bed 007",
            status: "Vacant",
            allowedOccupant: 1,
            actualOccupant: 0,
          },
          {
            bed: "Bed 008",
            status: "Occupied",
            allowedOccupant: 1,
            actualOccupant: 1,
            patient: "000000000768213 - ABINES, GHEEMAR KYLE TARROQUIN",
          },
          {
            bed: "Bed 009",
            status: "Occupied",
            allowedOccupant: 1,
            actualOccupant: 1,
            patient: "00000000660304 - LEGASPI, JOYCE BALANA",
          },
          {
            bed: "Bed 010",
            status: "Vacant",
            allowedOccupant: 1,
            actualOccupant: 0,
          },
          {
            bed: "Bed 011",
            status: "Vacant",
            allowedOccupant: 1,
            actualOccupant: 0,
          },
          {
            bed: "Bed 012",
            status: "Vacant",
            allowedOccupant: 1,
            actualOccupant: 0,
          },
          {
            bed: "Bed 013",
            status: "Vacant",
            allowedOccupant: 1,
            actualOccupant: 0,
          },
        ],
      },
    ],
    CCU: [],
    MICU: [],
    NICU: [],
    "NICU Trans": [],
    PICU: [],
    PIMAM: [],
    "Private/Pay": [],
    SICU: [],
    "Surge Ward": [],
    "Ward 1B - Medicine": [],
    "Ward 1C - Medicine": [],
    "Ward 2A - Pedia": [],
    "Ward 2B - Pedia": [],
    "Ward 3A - Surgery": [],
    "Ward 3B - Surgery": [],
    "Ward 3C - Surgery": [],
    "Ward 4A - Ob Gyne": [],
    "Ward 4B - Ob Gyne": [],
    "Ward 4C - Ob Gyne": [],
  };

  const editRoomGroups: RoomGroup[] = [
    {
      roomName: "6104",
      beds: [
        {
          bed: "000",
          status: "Occupied",
          allowedOccupant: 50,
          actualOccupant: 1,
        },
        {
          bed: "001",
          status: "Vacant",
          allowedOccupant: 1,
          actualOccupant: 0,
        },
        {
          bed: "002",
          status: "Vacant",
          allowedOccupant: 1,
          actualOccupant: 0,
        },
        {
          bed: "003",
          status: "Vacant",
          allowedOccupant: 1,
          actualOccupant: 0,
        },
        {
          bed: "004",
          status: "Vacant",
          allowedOccupant: 1,
          actualOccupant: 0,
        },
        {
          bed: "005",
          status: "Vacant",
          allowedOccupant: 1,
          actualOccupant: 0,
        },
        {
          bed: "006",
          status: "Vacant",
          allowedOccupant: 1,
          actualOccupant: 0,
        },
      ],
    },
    {
      roomName: "6105",
      beds: [
        {
          bed: "000",
          status: "Occupied",
          allowedOccupant: 50,
          actualOccupant: 1,
        },
        {
          bed: "001",
          status: "Vacant",
          allowedOccupant: 2,
          actualOccupant: 0,
        },
        {
          bed: "002",
          status: "Vacant",
          allowedOccupant: 1,
          actualOccupant: 0,
        },
        {
          bed: "003",
          status: "Vacant",
          allowedOccupant: 1,
          actualOccupant: 0,
        },
        {
          bed: "004",
          status: "Vacant",
          allowedOccupant: 1,
          actualOccupant: 0,
        },
        {
          bed: "005",
          status: "Vacant",
          allowedOccupant: 1,
          actualOccupant: 0,
        },
        {
          bed: "006",
          status: "Vacant",
          allowedOccupant: 1,
          actualOccupant: 0,
        },
        {
          bed: "007",
          status: "Vacant",
          allowedOccupant: 1,
          actualOccupant: 0,
        },
      ],
    },
    {
      roomName: "6106",
      beds: [
        {
          bed: "000",
          status: "Vacant",
          allowedOccupant: 50,
          actualOccupant: 0,
        },
      ],
    },
  ];

  useEffect(() => {
    const selectedPatientId = location.state?.selectedPatientId;

    if (selectedPatientId) {
      setTimeout(() => {}, 1500);
    }
  }, [location.state]);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const getCurrentDateTime = () => {
    return "03/21/26 03:32 PM";
  };

  const getTotalLengthOfStay = () => {
    return "0 day and 1 hr";
  };

  const editTotalBeds = editRoomGroups.reduce(
    (total, room) => total + room.beds.length,
    0
  );

  const editVacantBeds = editRoomGroups.reduce(
    (total, room) =>
      total + room.beds.filter((bed) => bed.status === "Vacant").length,
    0
  );

  const selectedEditRoomLabel = selectedEditRoom
    ? selectedEditRoom.replace("|", " - Bed ")
    : "No bed selected";

  const handleOpenEditRoomModal = () => {
    setSelectedEditRoom(null);
    setShowEditRoomModal(true);
  };

  const handleOpenTransferModal = () => {
    setSelectedTransferWard("Ward 1A - Medicine");
    setSelectedTransferBed(null);
    setShowTransferModal(true);
  };

  const handleShowInfo = (message: string) => {
    setInfoMessage(message);
    setShowInfoModal(true);
  };

  const handleViewRecordDetails = (record: AccomodationRecord) => {
    setSelectedRecord(record);
    setShowRecordDetailsModal(true);
  };

  const handleSaveEditRoom = () => {
    if (!selectedEditRoom) {
      handleShowInfo("Please select a room and bed before saving.");
      return;
    }

    const [room, bed] = selectedEditRoom.split("|");

    setAccomodationRecords((prev) =>
      prev.map((record) =>
        record.status === "Active"
          ? {
              ...record,
              room,
              bed,
            }
          : record
      )
    );

    setShowEditRoomModal(false);
    handleShowInfo("Room and bed successfully updated.");
  };

  const handleTransferPatient = () => {
    if (!selectedTransferBed) return;

    const currentDateTime = getCurrentDateTime();
    const [room, bed] = selectedTransferBed.split("|");

    setAccomodationRecords((prev) => {
      const updatedRecords = prev.map((record) =>
        record.status === "Active"
          ? {
              ...record,
              dateTo: currentDateTime,
              status: "Inactive" as const,
            }
          : record
      );

      return [
        ...updatedRecords,
        {
          id: Date.now(),
          ward: selectedTransferWard,
          room,
          bed,
          dateFrom: currentDateTime,
          dateTo: "-",
          lengthOfStay: "0 day and 0 hr",
          status: "Active",
        },
      ];
    });

    setShowTransferModal(false);
    handleShowInfo("Transfer successfully completed.");
  };

  const handleRevoke = () => {
    setAccomodationRecords((prev) =>
      prev.map((record) =>
        record.status === "Active"
          ? {
              ...record,
              dateTo: getCurrentDateTime(),
              status: "Inactive",
            }
          : record
      )
    );

    handleShowInfo("Revoke successfully completed.");
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="px-3 py-2 border-bottom" style={{ background: "#eef5f8" }}>
      <h6 className="fw-bold mb-0 text-dark">{title}</h6>
    </div>
  );

  const DetailItem = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div className="border rounded-1 bg-light p-3 h-100">
      <span
        className="text-muted d-block text-uppercase mb-1"
        style={{ fontSize: "0.7rem" }}
      >
        {label}
      </span>
      <span className="fw-bold text-dark">{value}</span>
    </div>
  );

  const RoomBedMobileCard = ({
    room,
    bed,
    selectedValue,
    onSelect,
    allowOnlyVacant = false,
  }: {
    room: RoomGroup;
    bed: RoomBed;
    selectedValue: string | null;
    onSelect: (value: string) => void;
    allowOnlyVacant?: boolean;
  }) => {
    const value = `${room.roomName}|${bed.bed}`;
    const isSelected = selectedValue === value;
    const canSelect = allowOnlyVacant ? bed.status === "Vacant" : true;

    return (
      <button
        type="button"
        disabled={!canSelect}
        className={`acc-bed-card text-start ${isSelected ? "selected" : ""}`}
        onClick={() => {
          if (canSelect) onSelect(value);
        }}
      >
        <div className="d-flex justify-content-between gap-2 mb-2">
          <div>
            <div className="small text-muted fw-semibold">Room / Bed</div>
            <div className="fw-bold text-dark">
              {room.roomName} - {bed.bed}
            </div>
          </div>

          <span
            className={`badge rounded-pill px-3 py-2 ${
              bed.status === "Vacant" ? "acc-bed-vacant" : "acc-bed-occupied"
            }`}
          >
            {bed.status}
          </span>
        </div>

        <div className="row g-2 small">
          <div className="col-6">
            <span className="text-muted d-block">Allowed</span>
            <span className="fw-bold text-dark">{bed.allowedOccupant}</span>
          </div>

          <div className="col-6">
            <span className="text-muted d-block">Actual</span>
            <span className="fw-bold text-dark">{bed.actualOccupant}</span>
          </div>

          <div className="col-12">
            <span className="text-muted d-block">Patient</span>
            <span className="fw-semibold text-dark acc-mobile-patient">
              {bed.patient || "—"}
            </span>
          </div>
        </div>

        {isSelected && (
          <div className="small fw-bold mt-2" style={{ color: "var(--primary, #0f763f)" }}>
            Selected
          </div>
        )}
      </button>
    );
  };

  const RoomRow = ({
    room,
    bed,
    selectedValue,
    onSelect,
    allowOnlyVacant = false,
  }: {
    room: RoomGroup;
    bed: RoomBed;
    selectedValue: string | null;
    onSelect: (value: string) => void;
    allowOnlyVacant?: boolean;
  }) => {
    const value = `${room.roomName}|${bed.bed}`;
    const isSelected = selectedValue === value;
    const canSelect = allowOnlyVacant ? bed.status === "Vacant" : true;

    return (
      <tr
        className={isSelected ? "acc-room-selected" : ""}
        onClick={() => {
          if (canSelect) onSelect(value);
        }}
        style={{
          cursor: canSelect ? "pointer" : "default",
        }}
      >
        <td style={{ width: "40px" }}>
          {bed.status === "Occupied" && (
            <i className="isax isax-user text-muted"></i>
          )}
        </td>

        <td
          className={
            bed.status === "Vacant"
              ? "small fw-bold text-danger"
              : "small fw-bold text-dark"
          }
        >
          {bed.bed}
        </td>

        <td
          className={
            bed.status === "Vacant"
              ? "small fw-semibold text-danger"
              : "small fw-semibold text-muted"
          }
        >
          {bed.status}
        </td>

        <td className="small fw-bold text-center">{bed.allowedOccupant}</td>
        <td className="small fw-bold text-center">{bed.actualOccupant}</td>

        <td className="small fw-semibold text-dark text-truncate">
          {bed.patient || ""}
        </td>
      </tr>
    );
  };

  return (
    <>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            height: 6px;
            width: 6px;
          }

          .hide-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }

          .hide-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 transparent;
          }

          .text-hover-primary:hover {
            color: var(--primary, #0f763f) !important;
          }

          .reg-toolbar-btn:disabled {
            cursor: not-allowed !important;
          }

          .acc-main-card {
            border-top: 4px solid var(--primary, #0f763f);
          }

          .acc-table-wrap {
            width: 100%;
            overflow: visible;
          }

          .acc-table {
            table-layout: fixed;
            width: 100%;
          }

          .acc-table thead th {
            background: #eef5f8;
            color: #6c757d;
            font-size: 12px;
            font-weight: 700;
            border-bottom: 1px solid #dee2e6;
            white-space: nowrap;
          }

          .acc-table tbody td {
            font-size: 13px;
            font-weight: 600;
            color: #343a40;
            vertical-align: middle;
          }

          .acc-table-text {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .acc-active-row {
            background: rgba(15, 118, 63, 0.08);
          }

          .acc-inactive-row {
            background: #f8f9fa;
          }

          .acc-status-active {
            color: var(--primary, #0f763f);
            background: rgba(15, 118, 63, 0.1);
          }

          .acc-status-inactive {
            color: #6c757d;
            background: #e9ecef;
          }

          .acc-total-los {
            font-size: 13px;
            font-weight: 800;
            color: #212529;
            text-align: center;
            padding: 12px;
            border-top: 1px solid #eef0f2;
          }

          .acc-window-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.45);
            z-index: 1050;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
          }

          .acc-window {
            width: 100%;
            max-width: 980px;
            height: 680px;
            max-height: 90vh;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
          }

          .acc-window-title {
            background: var(--primary, #0f763f);
            color: #fff;
            padding: 14px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          }

          .acc-window-title h5 {
            color: #fff;
          }

          .acc-window-body {
            height: calc(100% - 64px);
            display: flex;
            background: #f8f9fa;
          }

          .acc-side-panel {
            width: 230px;
            background: #ffffff;
            border-right: 1px solid #dee2e6;
            flex-shrink: 0;
            overflow-y: auto;
          }

          .acc-ward-list {
            padding: 10px;
            margin: 0;
            list-style: none;
          }

          .acc-ward-list li {
            padding: 10px 12px;
            font-size: 13px;
            font-weight: 700;
            color: #495057;
            border-radius: 4px;
            cursor: pointer;
            margin-bottom: 4px;
          }

          .acc-ward-list li:hover,
          .acc-ward-list li.active {
            background: var(--primary, #0f763f);
            color: #fff;
          }

          .acc-modal-content {
            flex: 1;
            padding: 16px;
            display: flex;
            flex-direction: column;
            min-width: 0;
          }

          .acc-room-container {
            background: #fff;
            border: 1px solid #dee2e6;
            border-radius: 6px;
            overflow-y: auto;
            flex: 1;
          }

          .acc-room-header {
            background: #eef5f8;
            border-bottom: 1px solid #dee2e6;
            padding: 14px 16px;
          }

          .acc-room-title {
            font-size: 20px;
            font-weight: 800;
            color: #212529;
            margin-bottom: 4px;
          }

          .acc-room-stats {
            display: flex;
            flex-wrap: wrap;
            gap: 28px;
            font-size: 12px;
            color: #6c757d;
            font-weight: 600;
          }

          .acc-room-name-row {
            background: #f8f9fa;
            color: #343a40;
            font-size: 13px;
            padding: 8px 14px;
            font-weight: 700;
            border-bottom: 1px solid #eef0f2;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .acc-room-name-row span:last-child {
            color: var(--primary, #0f763f);
          }

          .acc-room-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
          }

          .acc-room-table td,
          .acc-room-table th {
            padding: 8px 12px;
            border-bottom: 1px solid #f1f3f5;
          }

          .acc-room-table tbody tr:hover {
            background: rgba(15, 118, 63, 0.06);
          }

          .acc-room-selected {
            background: rgba(15, 118, 63, 0.12) !important;
            outline: 2px solid rgba(15, 118, 63, 0.25);
            outline-offset: -2px;
          }

          .acc-small-head {
            font-size: 10px;
            color: #6c757d;
            line-height: 1.1;
            text-align: center;
          }

          .acc-select-footer {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-top: 14px;
          }

          .acc-room-table-clean {
            table-layout: fixed;
            width: 100%;
          }

          .acc-room-table-clean thead th {
            background: #eef5f8;
            color: #6c757d;
            font-size: 12px;
            font-weight: 800;
            border-bottom: 1px solid #dee2e6;
            white-space: nowrap;
            text-transform: uppercase;
          }

          .acc-room-table-clean tbody td {
            font-size: 13px;
            color: #343a40;
            vertical-align: middle;
            border-bottom: 1px solid #f1f3f5;
            padding: 10px 12px;
          }

          .acc-room-table-clean tbody tr:hover {
            background: rgba(15, 118, 63, 0.06);
          }

          .acc-bed-vacant {
            color: var(--primary, #0f763f);
            background: rgba(15, 118, 63, 0.1);
          }

          .acc-bed-occupied {
            color: #6c757d;
            background: #e9ecef;
          }

          .acc-bed-card {
            width: 100%;
            border: 1px solid #dee2e6;
            background: #fff;
            border-radius: 6px;
            padding: 12px;
            margin-bottom: 10px;
            cursor: pointer;
          }

          .acc-bed-card:hover {
            background: rgba(15, 118, 63, 0.04);
            border-color: rgba(15, 118, 63, 0.3);
          }

          .acc-bed-card.selected {
            background: rgba(15, 118, 63, 0.08);
            border-color: var(--primary, #0f763f);
            box-shadow: 0 0 0 2px rgba(15, 118, 63, 0.1);
          }

          .acc-bed-card:disabled {
            cursor: not-allowed;
            opacity: 0.85;
          }

          .acc-mobile-patient {
            display: block;
            word-break: break-word;
          }

          .acc-info-backdrop {
            position: fixed;
            inset: 0;
            z-index: 1080;
            background: rgba(0, 0, 0, 0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
          }

          .acc-info-box {
            width: 320px;
            max-width: 100%;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
          }

          .acc-info-title {
            height: 40px;
            background: #f8f9fa;
            border-bottom: 1px solid #dee2e6;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
          }

          .acc-info-icon {
            width: 42px;
            height: 42px;
            background: var(--primary, #0f763f);
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            flex-shrink: 0;
          }

          .acc-view-btn {
            font-size: 11px;
            font-weight: 800;
            border-radius: 4px;
            padding: 5px 9px;
            color: var(--primary, #0f763f);
            background: rgba(15, 118, 63, 0.08);
            border: 1px solid rgba(15, 118, 63, 0.18);
            white-space: nowrap;
          }

          .acc-view-btn:hover {
            background: var(--primary, #0f763f);
            color: #fff;
          }

          .acc-responsive-modal {
            max-width: 540px;
          }

          @media (max-width: 991.98px) {
            .acc-main-card {
              border-top-width: 3px;
            }

            .acc-window {
              height: 92vh;
              max-height: 92vh;
            }

            .acc-window-body {
              flex-direction: column;
            }

            .acc-side-panel {
              width: 100%;
              max-height: 175px;
              border-right: 0;
              border-bottom: 1px solid #dee2e6;
            }

            .acc-ward-list {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 6px;
            }

            .acc-ward-list li {
              margin-bottom: 0;
              font-size: 12px;
              text-align: center;
            }

            .acc-modal-content {
              padding: 12px;
            }

            .acc-room-title {
              font-size: 16px;
            }

            .acc-room-stats {
              gap: 8px;
              flex-direction: column;
            }

            .acc-select-footer {
              justify-content: stretch;
            }

            .acc-select-footer .btn {
              width: 100%;
            }
          }

          @media (max-width: 767.98px) {
            .acc-table th,
            .acc-table td {
              font-size: 12px !important;
              padding: 9px 6px;
            }

            .acc-table .acc-col-ward {
              width: 28%;
            }

            .acc-table .acc-col-room {
              width: 18%;
            }

            .acc-table .acc-col-bed {
              width: 16%;
            }

            .acc-table .acc-col-status {
              width: 22%;
            }

            .acc-table .acc-col-action {
              width: 16%;
            }

            .acc-table .badge {
              padding: 6px 8px !important;
              font-size: 10px;
            }

            .acc-total-los {
              font-size: 12px;
            }

            .acc-room-name-row {
              display: none;
            }

            .acc-desktop-room-list {
              display: none !important;
            }

            .acc-mobile-room-list {
              display: block !important;
              padding: 12px;
            }

            .modal-dialog {
              margin: 0.5rem auto;
            }

            .modal-body {
              max-height: calc(100vh - 180px);
              overflow-y: auto;
            }
          }

          @media (min-width: 768px) {
            .acc-mobile-room-list {
              display: none !important;
            }
          }

          @media (max-width: 575.98px) {
            .content.nurse-content {
              margin-top: -1rem !important;
            }

            .container-fluid {
              padding-left: 10px !important;
              padding-right: 10px !important;
            }

            .acc-patient-avatar {
              width: 74px !important;
              height: 74px !important;
            }

            .acc-patient-name {
              font-size: 1.25rem !important;
            }

            .reg-toolbar-btn {
              width: 100%;
            }

            .acc-window-backdrop {
              padding: 8px;
            }

            .acc-window-title {
              padding: 12px;
            }

            .acc-window-title h5 {
              font-size: 1rem;
            }

            .acc-ward-list {
              grid-template-columns: 1fr;
            }

            .acc-side-panel {
              max-height: 145px;
            }

            .acc-room-header {
              padding: 12px;
            }

            .acc-info-box {
              width: 100%;
            }
          }
        `}
      </style>

      {/* page content */}
      <div
        className="content nurse-content bg-light mt-n4"
        style={{ minHeight: "100vh" }}
      >
        <div className="container-fluid px-3 px-lg-5 pt-0">
          <div className="row">
            {/* nurse sidebar */}
            <NurseSidebar />

            {/* specific patient record */}
            <div className="col-lg-8 col-xl-9 mt-4 mt-lg-0">
              <div className="card border-0 shadow-sm rounded-3 overflow-hidden mb-4 acc-main-card">
                {/* patient profile header */}
                <div className="bg-white px-3 px-md-4 pt-4">
                  <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-3 gap-md-4 pb-4 border-bottom text-center text-md-start">
                    <div
                      className="acc-patient-avatar rounded-circle d-flex align-items-center justify-content-center bg-light shadow-sm flex-shrink-0"
                      style={{
                        width: "90px",
                        height: "90px",
                        border: "2px solid var(--primary, #0f763f)",
                      }}
                    >
                      <i
                        className="isax isax-user fs-1"
                        style={{ color: "var(--primary, #0f763f)" }}
                      />
                    </div>

                    <div className="w-100">
                      <div className="badge bg-light text-secondary border mb-2 px-2 py-1">
                        ID: {mockPatientProfile.hospitalNumber}
                      </div>

                      <h3 className="acc-patient-name fw-bold mb-1 text-dark fs-3 fs-md-2">
                        {mockPatientProfile.lastName},{" "}
                        {mockPatientProfile.firstName}{" "}
                        {mockPatientProfile.middleName}
                      </h3>

                      <div className="text-muted small d-flex align-items-center justify-content-center justify-content-md-start gap-2 flex-wrap">
                        <i className="isax isax-location text-danger" />
                        <span>{mockPatientProfile.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* toolbar buttons */}
                <div className="bg-white px-3 px-md-4 py-3 border-bottom">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                    <h5 className="fw-bold text-dark mb-0 text-center text-md-start text-uppercase">
                      Accomodation
                    </h5>

                    <div
                      className="d-flex flex-column flex-sm-row flex-wrap justify-content-center justify-content-md-end pb-1 pb-lg-0 ms-md-auto"
                      style={{ gap: "6px" }}
                    >
                      <button
                        type="button"
                        className="reg-toolbar-btn btn btn-sm border border-secondary-subtle shadow-sm d-flex align-items-center justify-content-center gap-2 px-3 py-2 text-nowrap bg-white text-dark fw-bold text-hover-primary flex-grow-1 flex-md-grow-0"
                        style={{ borderRadius: "4px", cursor: "pointer" }}
                        onClick={handleOpenEditRoomModal}
                      >
                        <i className="isax isax-edit"></i>
                        <span>Edit Room</span>
                      </button>

                      <button
                        type="button"
                        className="reg-toolbar-btn btn btn-sm border border-secondary-subtle shadow-sm d-flex align-items-center justify-content-center gap-2 px-3 py-2 text-nowrap bg-white text-dark fw-bold text-hover-primary flex-grow-1 flex-md-grow-0"
                        style={{ borderRadius: "4px", cursor: "pointer" }}
                        onClick={handleOpenTransferModal}
                      >
                        <i className="isax isax-forward"></i>
                        <span>Transfer</span>
                      </button>

                      <button
                        type="button"
                        className="reg-toolbar-btn btn btn-sm border border-secondary-subtle shadow-sm d-flex align-items-center justify-content-center gap-2 px-3 py-2 text-nowrap bg-white text-danger fw-bold flex-grow-1 flex-md-grow-0"
                        style={{ borderRadius: "4px", cursor: "pointer" }}
                        onClick={handleRevoke}
                      >
                        <i className="isax isax-close-circle"></i>
                        <span>Revoke</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* accomodation table */}
                <SectionHeader title="Ward and Room Accomodation" />

                <div className="p-2 p-md-3">
                  <div className="acc-table-wrap">
                    <table className="table table-sm align-middle mb-0 acc-table">
                      <thead>
                        <tr>
                          <th className="acc-col-ward">Ward</th>
                          <th className="acc-col-room">Room</th>
                          <th className="acc-col-bed">Bed</th>
                          <th className="d-none d-lg-table-cell">Date From</th>
                          <th className="d-none d-xl-table-cell">Date To</th>
                          <th className="d-none d-lg-table-cell">Length of Stay</th>
                          <th className="text-end acc-col-status">Status</th>
                          <th className="text-end acc-col-action d-table-cell d-lg-none">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {accomodationRecords.map((record) => (
                          <tr
                            key={record.id}
                            className={
                              record.status === "Active"
                                ? "acc-active-row"
                                : "acc-inactive-row"
                            }
                          >
                            <td>
                              <span className="acc-table-text">{record.ward}</span>
                            </td>

                            <td>
                              <span className="acc-table-text">{record.room}</span>
                            </td>

                            <td>
                              <span className="acc-table-text">{record.bed}</span>
                            </td>

                            <td className="d-none d-lg-table-cell">
                              <span className="acc-table-text">{record.dateFrom}</span>
                            </td>

                            <td className="d-none d-xl-table-cell">
                              <span className="acc-table-text">{record.dateTo}</span>
                            </td>

                            <td className="d-none d-lg-table-cell">
                              <span className="acc-table-text">
                                {record.lengthOfStay}
                              </span>
                            </td>

                            <td className="text-end">
                              <span
                                className={`badge rounded-pill px-3 py-2 ${
                                  record.status === "Active"
                                    ? "acc-status-active"
                                    : "acc-status-inactive"
                                }`}
                              >
                                {record.status}
                              </span>
                            </td>

                            <td className="text-end d-table-cell d-lg-none">
                              <button
                                type="button"
                                className="acc-view-btn"
                                onClick={() => handleViewRecordDetails(record)}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="acc-total-los">
                    Total LOS : {getTotalLengthOfStay()}
                  </div>
                </div>

                <div className="d-none d-xl-block" style={{ minHeight: "420px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* transfer utility modal */}
      {showTransferModal && (
        <div className="acc-window-backdrop">
          <div className="acc-window shadow-lg">
            <div className="acc-window-title">
              <div>
                <h5 className="fw-bold mb-0">Transfer Utility</h5>
                <div className="small opacity-75">
                  Select a vacant bed to transfer the patient.
                </div>
              </div>

              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowTransferModal(false)}
              />
            </div>

            <div className="acc-window-body">
              <div className="acc-side-panel">
                <ul className="acc-ward-list">
                  {transferWards.map((ward) => (
                    <li
                      key={ward}
                      className={selectedTransferWard === ward ? "active" : ""}
                      onClick={() => {
                        setSelectedTransferWard(ward);
                        setSelectedTransferBed(null);
                      }}
                    >
                      {ward}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="acc-modal-content">
                <div className="acc-room-container">
                  {transferRoomGroups[selectedTransferWard]?.length > 0 ? (
                    transferRoomGroups[selectedTransferWard].map((room) => (
                      <div key={room.roomName}>
                        <div className="acc-room-header">
                          <div className="acc-room-title">
                            {selectedTransferWard}
                          </div>

                          <div className="acc-room-stats">
                            <span>Total No. of Bed : 90</span>
                            <span>Number of Vacant Bed : 48</span>
                          </div>
                        </div>

                        <div className="acc-room-name-row">
                          <span>Room Name :</span>
                          <span>{room.roomName}</span>
                          <span className="ms-auto acc-small-head">
                            Allowed
                            <br />
                            Occupant
                          </span>
                          <span className="acc-small-head">
                            Actual
                            <br />
                            Occupant
                          </span>
                        </div>

                        <div className="acc-desktop-room-list">
                          <table className="acc-room-table">
                            <tbody>
                              {room.beds.map((bed) => (
                                <RoomRow
                                  key={bed.bed}
                                  room={room}
                                  bed={bed}
                                  selectedValue={selectedTransferBed}
                                  onSelect={setSelectedTransferBed}
                                  allowOnlyVacant
                                />
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="acc-mobile-room-list">
                          {room.beds.map((bed) => (
                            <RoomBedMobileCard
                              key={bed.bed}
                              room={room}
                              bed={bed}
                              selectedValue={selectedTransferBed}
                              onSelect={setSelectedTransferBed}
                              allowOnlyVacant
                            />
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <div className="acc-room-header">
                        <div className="acc-room-title">
                          {selectedTransferWard}
                        </div>

                        <div className="acc-room-stats">
                          <span>Total No. of Bed : 0</span>
                          <span>Number of Vacant Bed : 0</span>
                        </div>
                      </div>

                      <div className="p-4 text-muted small fw-semibold">
                        No available room record for this ward.
                      </div>
                    </div>
                  )}
                </div>

                <div className="acc-select-footer">
                  <button
                    type="button"
                    className="btn btn-sm text-white fw-bold px-5 py-2"
                    style={{
                      backgroundColor: "var(--primary, #0f763f)",
                      borderColor: "var(--primary, #0f763f)",
                    }}
                    disabled={!selectedTransferBed}
                    onClick={handleTransferPatient}
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* edit room modal */}
      {showEditRoomModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered px-2 px-md-3">
            <div
              className="modal-content border-0 shadow-lg"
              style={{ borderRadius: "8px", overflow: "hidden" }}
            >
              <div
                className="modal-header border-0 py-3 d-flex align-items-center"
                style={{ backgroundColor: "#0f763f" }}
              >
                <div>
                  <h3
                    className="modal-title text-white fw-bold m-0 d-flex align-items-center gap-2"
                    style={{ fontSize: "1.1rem", letterSpacing: "0.5px" }}
                  >
                    <i
                      className="isax isax-edit"
                      style={{ fontSize: "1.4rem" }}
                    ></i>
                    Update Room / Bed
                  </h3>

                  <div className="small text-white-50 mt-1">
                    Select the new room and bed assignment for the patient.
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowEditRoomModal(false)}
                />
              </div>

              <div className="modal-body bg-white p-3 p-md-4">
                <div className="row g-3 mb-3">
                  <div className="col-md-4">
                    <DetailItem label="Current Ward" value="Ph Med" />
                  </div>

                  <div className="col-md-4">
                    <DetailItem label="Total Beds" value={editTotalBeds} />
                  </div>

                  <div className="col-md-4">
                    <div className="border rounded-1 bg-light p-3 h-100">
                      <span
                        className="text-muted d-block text-uppercase mb-1"
                        style={{ fontSize: "0.7rem" }}
                      >
                        Vacant Beds
                      </span>
                      <span
                        className="fw-bold"
                        style={{ color: "var(--primary, #0f763f)" }}
                      >
                        {editVacantBeds}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-1 shadow-sm overflow-hidden">
                  <div
                    className="px-3 py-2 border-bottom d-flex flex-column flex-md-row justify-content-between gap-2"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <div>
                      <h6 className="fw-bold text-dark mb-0">
                        Available Room and Bed List
                      </h6>
                      <div className="small text-muted">
                        Click a row or card to select a bed assignment.
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <span className="small text-muted fw-semibold">
                        Selected:
                      </span>
                      <span
                        className="badge rounded-pill px-3 py-2"
                        style={{
                          backgroundColor: selectedEditRoom
                            ? "rgba(15, 118, 63, 0.1)"
                            : "#e9ecef",
                          color: selectedEditRoom
                            ? "var(--primary, #0f763f)"
                            : "#6c757d",
                        }}
                      >
                        {selectedEditRoomLabel}
                      </span>
                    </div>
                  </div>

                  <div
                    className="acc-desktop-room-list hide-scrollbar"
                    style={{ maxHeight: "430px", overflowY: "auto" }}
                  >
                    <table className="table table-sm align-middle mb-0 acc-room-table-clean">
                      <thead>
                        <tr>
                          <th style={{ width: "50px" }}></th>
                          <th>Room</th>
                          <th>Bed</th>
                          <th>Status</th>
                          <th className="text-center">Allowed Occupant</th>
                          <th className="text-center">Actual Occupant</th>
                          <th>Patient</th>
                        </tr>
                      </thead>

                      <tbody>
                        {editRoomGroups.map((room) =>
                          room.beds.map((bed) => {
                            const value = `${room.roomName}|${bed.bed}`;
                            const isSelected = selectedEditRoom === value;

                            return (
                              <tr
                                key={`${room.roomName}-${bed.bed}`}
                                className={isSelected ? "acc-room-selected" : ""}
                                onClick={() => setSelectedEditRoom(value)}
                                style={{ cursor: "pointer" }}
                              >
                                <td className="text-center">
                                  {isSelected ? (
                                    <span
                                      className="rounded-circle d-inline-flex align-items-center justify-content-center"
                                      style={{
                                        width: "24px",
                                        height: "24px",
                                        backgroundColor:
                                          "var(--primary, #0f763f)",
                                        color: "#fff",
                                      }}
                                    >
                                      <i
                                        className="isax isax-tick-circle"
                                        style={{ fontSize: "14px" }}
                                      ></i>
                                    </span>
                                  ) : bed.status === "Occupied" ? (
                                    <i className="isax isax-user text-muted"></i>
                                  ) : (
                                    <i className="isax isax-hospital text-muted"></i>
                                  )}
                                </td>

                                <td className="fw-bold text-dark">
                                  {room.roomName}
                                </td>

                                <td className="fw-bold text-dark">{bed.bed}</td>

                                <td>
                                  <span
                                    className={`badge rounded-pill px-3 py-2 ${
                                      bed.status === "Vacant"
                                        ? "acc-bed-vacant"
                                        : "acc-bed-occupied"
                                    }`}
                                  >
                                    {bed.status}
                                  </span>
                                </td>

                                <td className="text-center fw-bold">
                                  {bed.allowedOccupant}
                                </td>

                                <td className="text-center fw-bold">
                                  {bed.actualOccupant}
                                </td>

                                <td className="text-muted small fw-semibold">
                                  <span className="acc-table-text">
                                    {bed.patient || "—"}
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div
                    className="acc-mobile-room-list"
                    style={{ maxHeight: "430px", overflowY: "auto" }}
                  >
                    {editRoomGroups.map((room) =>
                      room.beds.map((bed) => (
                        <RoomBedMobileCard
                          key={`${room.roomName}-${bed.bed}`}
                          room={room}
                          bed={bed}
                          selectedValue={selectedEditRoom}
                          onSelect={setSelectedEditRoom}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div
                className="modal-footer border-0 d-flex flex-column flex-sm-row justify-content-between gap-2 p-3"
                style={{ backgroundColor: "#e2e5e9" }}
              >
                <div className="small text-muted fw-semibold text-center text-sm-start">
                  Please review the selected room and bed before saving.
                </div>

                <div className="d-flex flex-column flex-sm-row gap-2 w-100 w-sm-auto">
                  <button
                    type="button"
                    className="btn btn-light rounded-1 px-4 py-2 fw-medium border-secondary-subtle"
                    onClick={() => setShowEditRoomModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    disabled={!selectedEditRoom}
                    className={`btn rounded-1 px-4 py-2 fw-medium ${
                      !selectedEditRoom ? "btn-light text-muted" : "text-white"
                    }`}
                    style={{
                      backgroundColor: selectedEditRoom
                        ? "var(--primary, #0f763f)"
                        : "#f8f9fa",
                      borderColor: selectedEditRoom
                        ? "var(--primary, #0f763f)"
                        : "#dee2e6",
                      cursor: selectedEditRoom ? "pointer" : "not-allowed",
                    }}
                    onClick={handleSaveEditRoom}
                  >
                    <i className="isax isax-save-2 me-2"></i>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* record details modal */}
      {showRecordDetailsModal && selectedRecord && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.45)", zIndex: 1070 }}
        >
          <div className="modal-dialog modal-dialog-centered acc-responsive-modal px-2">
            <div className="modal-content border-0 shadow-lg overflow-hidden">
              <div
                className="modal-header border-0"
                style={{ backgroundColor: "var(--primary, #0f763f)" }}
              >
                <div>
                  <h5 className="modal-title text-white fw-bold mb-0">
                    Accomodation Details
                  </h5>
                  <div className="small text-white-50">
                    Complete ward and room information.
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowRecordDetailsModal(false)}
                />
              </div>

              <div className="modal-body bg-white">
                <div className="row g-3">
                  <div className="col-6">
                    <DetailItem label="Ward" value={selectedRecord.ward} />
                  </div>

                  <div className="col-6">
                    <DetailItem label="Room" value={selectedRecord.room} />
                  </div>

                  <div className="col-6">
                    <DetailItem label="Bed" value={selectedRecord.bed} />
                  </div>

                  <div className="col-6">
                    <div className="border rounded-1 bg-light p-3 h-100">
                      <span
                        className="text-muted d-block text-uppercase mb-1"
                        style={{ fontSize: "0.7rem" }}
                      >
                        Status
                      </span>
                      <span
                        className={`badge rounded-pill px-3 py-2 ${
                          selectedRecord.status === "Active"
                            ? "acc-status-active"
                            : "acc-status-inactive"
                        }`}
                      >
                        {selectedRecord.status}
                      </span>
                    </div>
                  </div>

                  <div className="col-12">
                    <DetailItem label="Date From" value={selectedRecord.dateFrom} />
                  </div>

                  <div className="col-12">
                    <DetailItem label="Date To" value={selectedRecord.dateTo} />
                  </div>

                  <div className="col-12">
                    <DetailItem
                      label="Length of Stay"
                      value={selectedRecord.lengthOfStay}
                    />
                  </div>
                </div>
              </div>

              <div
                className="modal-footer border-0"
                style={{ backgroundColor: "#e2e5e9" }}
              >
                <button
                  type="button"
                  className="btn text-white fw-bold px-4"
                  style={{
                    backgroundColor: "var(--primary, #0f763f)",
                    borderColor: "var(--primary, #0f763f)",
                  }}
                  onClick={() => setShowRecordDetailsModal(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* info modal */}
      {showInfoModal && (
        <div className="acc-info-backdrop">
          <div className="acc-info-box shadow-lg">
            <div className="acc-info-title">
              <span>Info</span>

              <button
                type="button"
                className="btn-close btn-close-sm"
                onClick={() => setShowInfoModal(false)}
              />
            </div>

            <div className="d-flex align-items-center gap-3 p-4">
              <div className="acc-info-icon">
                <i className="isax isax-info-circle"></i>
              </div>

              <div className="small fw-semibold text-dark">{infoMessage}</div>
            </div>

            <div className="d-flex justify-content-end px-4 pb-3">
              <button
                type="button"
                className="btn btn-sm text-white fw-bold px-4"
                style={{
                  backgroundColor: "var(--primary, #0f763f)",
                  borderColor: "var(--primary, #0f763f)",
                }}
                onClick={() => setShowInfoModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* /page content */}
    </>
  );
};

export default RegDetails;