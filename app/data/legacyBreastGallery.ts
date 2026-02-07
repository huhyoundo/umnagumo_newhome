export type SurgeryType = 'primary' | 'revision';

export type GalleryFilter = 'all' | SurgeryType;

export interface LegacyBreastGalleryItem {
  id: number;
  legacyNewsId: string;
  surgeryType: SurgeryType;
  title: string;
  description: string;
  image?: string;
  imageBefore?: string;
  imageAfter?: string;
  modalImage?: string;
}

export const legacyBreastGalleryItems: LegacyBreastGalleryItem[] = [
  {
    id: 25,
    legacyNewsId: "NEWS_000000000000025",
    surgeryType: "revision",
    title: "겨드랑이 절개하 재수술\n모티바 보형물",
    description: "좌측 구축 및 우측 어색한라인\n양측 피막절제 후 밑선라인 교정",
    imageBefore: "/assets/before-after/revision/case-25-before.png",
    imageAfter: "/assets/before-after/revision/case-25-after.png",
  },



  {
    id: 24,
    legacyNewsId: "NEWS_000000000000024",
    surgeryType: "revision",
    title: "겨드랑이 절개하 재수술\n모티바 보형물",
    description: "좌측 구축 및 우측 어색한라인\n양측 피막절제 후 밑선라인 교정",
    image: "/assets/before-after/revision/NEWS_000000000000024-preview.png",
    modalImage: "/assets/before-after/revision/NEWS_000000000000024-modal.png",
  },


  {
    id: 17,
    legacyNewsId: "NEWS_000000000000017",
    surgeryType: "primary",
    title: "겨드랑이 절개하 첫수술\n세빈 보형물",
    description: "",
    image: "/assets/before-after/primary/NEWS_000000000000017-preview.png",
    modalImage: "/assets/before-after/primary/NEWS_000000000000017-modal.jpg",
  },
  {
    id: 16,
    legacyNewsId: "NEWS_000000000000016",
    surgeryType: "primary",
    title: "겨드랑이 절개하 첫수술\n모티바 보형물",
    description: "",
    image: "/assets/before-after/primary/NEWS_000000000000016-preview.png",
    modalImage: "/assets/before-after/primary/NEWS_000000000000016-modal.jpg",
  },


  {
    id: 13,
    legacyNewsId: "NEWS_000000000000013",
    surgeryType: "primary",
    title: "겨드랑이 절개하 첫수술\n멘토 보형물",
    description: "",
    image: "/assets/before-after/primary/NEWS_000000000000013-preview.png",
    modalImage: "/assets/before-after/primary/NEWS_000000000000013-modal.jpg",
  },
  {
    id: 12,
    legacyNewsId: "NEWS_000000000000012",
    surgeryType: "primary",
    title: "겨드랑이 절개하 첫수술\n모티바 보형물",
    description: "",
    image: "/assets/before-after/primary/NEWS_000000000000012-preview.png",
    modalImage: "/assets/before-after/primary/NEWS_000000000000012-modal.jpg",
  },
  {
    id: 11,
    legacyNewsId: "NEWS_000000000000011",
    surgeryType: "primary",
    title: "겨드랑이 절개하 첫수술\n모티바 보형물",
    description: "",
    image: "/assets/before-after/primary/NEWS_000000000000011-preview.png",
    modalImage: "/assets/before-after/primary/NEWS_000000000000011-modal.jpg",
  },
  {
    id: 10,
    legacyNewsId: "NEWS_000000000000010",
    surgeryType: "primary",
    title: "겨드랑이 절개하 첫수술\n모티바 보형물",
    description: "",
    image: "/assets/before-after/primary/NEWS_000000000000010-preview.png",
    modalImage: "/assets/before-after/primary/NEWS_000000000000010-modal.jpg",
  },


  {
    id: 7,
    legacyNewsId: "NEWS_000000000000007",
    surgeryType: "primary",
    title: "겨드랑이 절개하 첫수술\n멘토 보형물",
    description: "",
    image: "/assets/before-after/primary/NEWS_000000000000007-preview.png",
    modalImage: "/assets/before-after/primary/NEWS_000000000000007-modal.jpg",
  },
  {
    id: 6,
    legacyNewsId: "NEWS_000000000000006",
    surgeryType: "primary",
    title: "겨드랑이 절개하 첫수술\n모티바 보형물",
    description: "",
    image: "/assets/before-after/primary/NEWS_000000000000006-preview.png",
    modalImage: "/assets/before-after/primary/NEWS_000000000000006-modal.jpg",
  },
  {
    id: 5,
    legacyNewsId: "NEWS_000000000000005",
    surgeryType: "primary",
    title: "겨드랑이 절개하 첫수술\n멘토 보형물",
    description: "",
    image: "/assets/before-after/primary/NEWS_000000000000005-preview.png",
    modalImage: "/assets/before-after/primary/NEWS_000000000000005-modal.jpg",
  },

  {
    id: 3,
    legacyNewsId: "NEWS_000000000000003",
    surgeryType: "primary",
    title: "겨드랑이 절개하 첫수술\n멘토 보형물",
    description: "",
    image: "/assets/before-after/primary/NEWS_000000000000003-preview.png",
    modalImage: "/assets/before-after/primary/NEWS_000000000000003-modal.jpg",
  },
  {
    id: 2,
    legacyNewsId: "NEWS_000000000000002",
    surgeryType: "primary",
    title: "겨드랑이 절개하 첫수술\n모티바 보형물",
    description: "",
    image: "/assets/before-after/primary/NEWS_000000000000002-preview.png",
    modalImage: "/assets/before-after/primary/NEWS_000000000000002-modal.jpg",
  },
  {
    id: 1,
    legacyNewsId: "NEWS_000000000000001",
    surgeryType: "primary",
    title: "겨드랑이 절개하 첫수술\n모티바 보형물",
    description: "",
    image: "/assets/before-after/primary/NEWS_000000000000001-preview.png",
    modalImage: "/assets/before-after/primary/NEWS_000000000000001-modal.jpg",
  },
];
