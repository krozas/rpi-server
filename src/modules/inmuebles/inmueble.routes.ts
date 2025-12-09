import { asyncHandler } from "@src/middlewares/asyncHandler";
import { NextFunction, Request, Response, Router } from "express";
import * as service from "./inmueble.service";
const router = Router();

const MODULO = "inmuebles";

router.post(
  "/",
  asyncHandler(MODULO, async (req: Request, res: Response) => {
    const params: FiltrosPersonaInmueble = req.body;
    return await service.getByFiltros(params);
  })
);

router.post(
  "/titulares",
  asyncHandler(MODULO, async (req: Request, res: Response) => {
    const params: FiltrosPersonaInmueble = req.body;
    return await service.getTitulares(params);
  })
);

router.post(
  "/save",
  asyncHandler(MODULO, async (req: Request, res: Response) => {
    const params: InputInmueble = req.body;
    return await service.save(params);
  })
);

router.post(
  "/delete",
  asyncHandler(
    MODULO,
    async (req: Request, res: Response, next: NextFunction) => {
      const params: any = req.body;
      return await service.remove(params);
    }
  )
);

router.post(
  "/estadisticas",
  asyncHandler(
    MODULO,
    async (req: Request, res: Response, next: NextFunction) => {
      return await service.getDataAnioDpto();
    }
  )
);

router.post(
  "/esPosibleRegistrar",
  asyncHandler(
    MODULO,
    async (req: Request, res: Response, next: NextFunction) => {
      const params: Inmueble = req.body;
      return await service.esPosibleRegistrar(params);
    }
  )
)

module.exports = router;
