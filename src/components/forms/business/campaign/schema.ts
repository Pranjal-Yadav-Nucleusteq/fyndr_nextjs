import z from "zod";

// export const OfferSchema = z.object({
//   title: z.string().min(1, "Please Enter Title"),

//   amount: z.string({
//     required_error: "Amount is required",
//     invalid_type_error: "Amount must be a number",
//   }),

//   discountType: z.string().optional(),

//   retailPrice: z.coerce
//     .number({
//       required_error: "Retail Price is required",
//       invalid_type_error: "Retail Price must be a number",
//     })
//     .min(0, "Retail Price must be greater than or equal to 0"),

//   offerPrice: z.union([
//     z.string({ invalid_type_error: "Offer Price must be a number" }),
//     z.number(),
//   ]),

//   offersAvailable: z
//     .union([z.string(), z.number(), z.null()])
//     .optional()
//     .nullable(),

//   offerLimit: z.union([z.string(), z.number()]).optional().nullable(),

//   currency: z.string().optional(),
//   currencySymbol: z.string().optional(),

//   status: z.enum(["active", "inactive"]),

//   isNew: z.boolean().optional(),

//   offerType: z.string(),

//   usageLimit: z.union([z.string(), z.number()]),

//   validityPeriod: z.string(),

//   stdTax: z.boolean(),

//   taxPercent: z
//     .string({
//       invalid_type_error: "Tax Percent must be a number",
//     })
//     .optional(),

//   isBookingEnabled: z.boolean().optional(),

//   displayOrder: z.union([z.string(), z.number()]).optional(),

//   repurchasePeriod: z.coerce
//     .number({
//       invalid_type_error: "Repurchase Period must be a positive number",
//     })
//     .optional(),

//   voucherFile: z.any().nullable().optional(),
//   voucherFileName: z.string().nullable().optional(),
//   isVoucher: z.boolean().nullable().optional(),
//   couponCode: z.string().optional().nullable(),
//   offerSold: z.string().optional().nullable(),
// });

export const OfferSchema = z.object({
  title: z.string().min(1, "Please Enter Title"),

  amount: z.coerce.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  }),

  discountType: z.string().optional(),

  retailPrice: z.coerce
    .number({
      required_error: "Retail Price is required",
      invalid_type_error: "Retail Price must be a number",
    })
    .min(0, "Retail Price must be greater than or equal to 0"),

  offerPrice: z.coerce.number({
    required_error: "Offer Price is required",
    invalid_type_error: "Offer Price must be a number",
  }),

  offersAvailable: z.coerce.number().nullable().optional(),

  offerLimit: z.coerce.number().nullable().optional(),

  currency: z.string().optional(),
  currencySymbol: z.string().optional(),

  status: z.enum(["active", "inactive"]),

  isNew: z.boolean().optional(),

  offerType: z.enum(["offers", "coupons", "events"]),

  usageLimit: z.coerce.number({
    required_error: "Usage Limit is required",
    invalid_type_error: "Usage Limit must be a number",
  }),

  validityPeriod: z.string(),

  stdTax: z.boolean(),

  taxPercent: z.coerce.number().nullable().optional(),

  isBookingEnabled: z.boolean().optional(),

  displayOrder: z.coerce.number().optional(),

  repurchasePeriod: z.coerce
    .number({
      invalid_type_error: "Repurchase Period must be a positive number",
    })
    .optional(),

  voucherFile: z.any().nullable().optional(),
  voucherFileName: z.string().nullable().optional(),
  isVoucher: z.boolean().nullable().optional(),
  couponCode: z.string().optional().nullable(),
  offerSold: z.coerce.number().nullable().optional(),
});
