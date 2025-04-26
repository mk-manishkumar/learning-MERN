from fastapi import APIRouter, Body, HTTPException
from fastapi.encoders import jsonable_encoder
from server.model import NoteSchema

router = APIRouter()

notes = {
    "1": {
        "title": "My first note",
        "content": "This is the first note in my notes application."
    },
    "2": {
        "title": "Understanding Black Holes",
        "content": "A black hole is a region in spacetime where gravity is so strong that nothing, not even light or other electromagnetic waves, has enough energy to escape it."
    },
    "3": {
        "title": "The Theory of Relativity",
        "content": "The theory of relativity is a scientific theory of the relationship between space and time. It is based on two postulates: the laws of physics are invariant in all inertial frames of reference, and the speed of light in vacuum is the same for all observers, regardless of the motion of light source or observer."
    },
}


@router.get("/", tags=["Notes"])
async def get_notes() -> dict:
    return {"data": notes}


@router.get("/{id}", tags=["Notes"])
async def get_note(id: str) -> dict:
    note = notes.get(id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found.")
    return {"data": note}


@router.post("/", tags=["Notes"])
async def add_note(note: NoteSchema = Body(...)) -> dict:
    new_id = str(len(notes) + 1)
    notes[new_id] = note.dict()
    return {"message": "Note added successfully.", "note_id": new_id}


@router.put("/{id}", tags=["Notes"])
async def update_note(id: str, note: NoteSchema = Body(...)) -> dict:
    existing_note = notes.get(id)
    if not existing_note:
        raise HTTPException(status_code=404, detail="Note not found.")

    stored_note_model = NoteSchema(**existing_note)
    updated_data = note.dict(exclude_unset=True)
    updated_note = stored_note_model.copy(update=updated_data)

    notes[id] = jsonable_encoder(updated_note)
    return {"message": "Note updated successfully."}


@router.delete("/{id}", tags=["Notes"])
async def delete_note(id: str) -> dict:
    if id not in notes:
        raise HTTPException(status_code=404, detail="Note not found.")

    del notes[id]
    return {"message": "Note deleted successfully."}
